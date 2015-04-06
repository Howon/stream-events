module.exports = {
    verify_user:function(everyauth, config){

        everyauth.debug = true;
    
        // var CU_EMAIL_REGEX = r"^(?P<uni>[a-z\d]+)@.*(columbia|barnard)\.edu$"
    
        var usersById = {};
        var nextUserId = 0;
  
        function addUser (source, sourceUser) {
          var user;
          if (arguments.length === 1) { // password-based
            user = sourceUser = source;
            user.id = ++nextUserId;
            return usersById[nextUserId] = user;
          } else { // non-password-based
            user = usersById[++nextUserId] = {id: nextUserId};
            user[source] = sourceUser;
          }
          return user;
        }
    
        var usersByGoogleId = {};
    
        everyauth.google
          .appId(config.google.clientId)
          .appSecret(config.google.clientSecret)
          .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
          .findOrCreateUser(function (sess, accessToken, extra, googleUser) {
            googleUser.refreshToken = extra.refresh_token;
            googleUser.expiresIn = extra.expires_in;
            return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
          })
      .redirectPath('/');
    }
}