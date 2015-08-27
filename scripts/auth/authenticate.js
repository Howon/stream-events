//https://scotch.io/tutorials/easy-node-authentication-google
var User = require('../data_schemas/user');

var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
            User.findOne({ 'info.id' : profile.id }, function(err, user) {
                if (err){
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.info.id    = profile.id;
                    newUser.info.token = token;
                    newUser.info.name  = profile._json.first_name + ' ' + profile._json.last_name;
                    newUser.info.email = profile._json.email
                    console.log(newUser)
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    // passport.use(new GoogleStrategy({
    //         clientID        : config.googleAuth.clientID,
    //         clientSecret    : config.googleAuth.clientSecret,
    //         callbackURL     : config.googleAuth.callbackURL,
    //     },
    //     function(token, refreshToken, profile, done) {
    //         // make the code asynchronous
    //         // User.findOne won't fire until we have all our data back from Google
    //         process.nextTick(function() {
    //             // try to find the user based on their google id
    //             User.findOne({ 'google.id' : profile.id }, function(err, user) {
    //                 if (err){
    //                     return done(err);
    //                 }
    //                 if (user) {
    //                     // if a user is found, log them in
    //                     return done(null, user);
    //                 } else {
    //                     // if the user isnt in our database, create a new user
    //                     var newUser = new User();
                        
    //                     // console.log(profile)
    //                     // set all of the relevant information
    //                     newUser.info.google.id    = profile.id;
    //                     newUser.info.google.token = token;
    //                     newUser.info.google.name  = profile.displayName;
    //                     newUser.info.google.email = profile.emails[0].value; // pull the first email
    //                     // save the user
    //                     newUser.info.save(function(err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //         });
    //     }
    // ));
}
