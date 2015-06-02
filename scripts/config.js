module.exports = {
	mongoose: {
		url: 'mongodb://localhost:27017/data/'
	},
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
