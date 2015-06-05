//https://scotch.io/tutorials/easy-node-authentication-google
var User = require('./user');

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var config =  require('../config');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: config.fbAuth.appID,
            clientSecret: config.fbAuth.appSecret,
            callbackURL: config.fbAuth.callbackURL
        },

        function(token, refreshToken, profile, done) {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err){
                        return done(err);
                    }
                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();
                        // set all of the relevant information
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID        : config.googleAuth.clientID,
            clientSecret    : config.googleAuth.clientSecret,
            callbackURL     : config.googleAuth.callbackURL,
        },

        function(token, refreshToken, profile, done) {
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {
                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err){
                        return done(err);
                    }
                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log(newUser);
                            return done(null, newUser);
                        });
                    }
                });
            });

        }
    ));
}
