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
      } else { // non-password-based
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
      }
      return user;
    }

    var usersByGoogleId = {};

    everyauth.everymodule
      .findUserById( function (id, callback) {
        callback(null, usersById[id]);
      });

    everyauth.google
      .appId(config.google.clientId)
      .appSecret(config.google.clientSecret)
      .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
      .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
        googleUser.refreshToken = extra.refresh_token;
        googleUser.expiresIn = extra.expires_in;
        console.log(googleUser)
        return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
      })
      .redirectPath('/home');
    }
}

