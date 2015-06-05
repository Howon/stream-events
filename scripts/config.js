module.exports = {
    port: process.env.PORT || 3000
    ,
	mongoose: {
		url: 'mongodb://localhost:27017/data/'
	},
    facebook_access_token: "CAACEdEose0cBALRVwLnJ3fzaVzqDp1V10KpUPiy9xGSxkoOphoansIJbgc6jNYtvefhNb9P2fG3fJPa3jXXIJrMKyes8Jpcy5kpneBZAZAmpM8GTph0SN8YRAea6iZBu8D5N6EDRz5Fr5foHWqIHIzlo6b9ldNZB1a7Hr55RSZAqh1GZBZCWaKxe1aDDZC664djjUYuov0DHE4TMXNofu3a68bVAbH5VH1gZD"
    ,
    fbAuth: {
        appID         : '1500930803526110', 
        appSecret     : '85669778b0c8d2f9fdc5fcdb3087d48c',
        callbackURL   : "http://localhost:3000/auth/facebook/callback",
    },
    googleAuth: {
        clientID      : '290334048960-pnbarpbfkcbscb5nree6mms60ace8og6.apps.googleusercontent.com', 
        clientSecret  : 'QaUNW5M3Qyt2XYSYl4lfSw69',
        callbackURL   : 'http://localhost:3000/auth/google/callback'
    }
};
