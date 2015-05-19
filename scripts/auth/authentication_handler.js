module.exports = {
    verify_user : function(everyauth, config){

    var usersById = {};
    var nextUserId = 0;

    function addUser (source, sourceUser) {
      var user;
      if (arguments.length === 1) { // password-based
        user = sourceUser = source;
        user.id = ++nextUserId;
        return usersById[nextUserId] = user;
      } else {
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
      }
      return user;
    }
    
    function validateEmail(email) {
        var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

        if (re.test(email)) {
            if ((email.indexOf('@columbia.edu', email.length -'@columbia.edu'.length) !== -1) 
              || (email.indexOf('@barnard.edu', email.length -'@barnard.edu'.length) !== -1)) {
                return true;
            }
        return false;
        }
    }
    
    var usersByGoogleId = {};

    everyauth.everymodule
      .findUserById( function (id, callback) {
        callback(null, usersById[id]);
      });

    everyauth.facebook
      .appId(config.fb.appId)
      .appSecret(config.fb.appSecret)
      .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
        console.log(fbUserMetadata);
        return usersByFbId[fbUserMetadata.id] || (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
      })
      .redirectPath('/home');

    everyauth.google
      .appId(config.google.clientId)
      .appSecret(config.google.clientSecret)
      .scope('https://www.googleapis.com/auth/userinfo.email')
      .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
        googleUser.refreshToken = extra.refresh_token;
        googleUser.expiresIn = extra.expires_in;
        return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
      })
      .redirectPath('/home');
    }
}