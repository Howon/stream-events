var fbgraph = require('fbgraphapi');
app.use(fbgraph.auth( {
        appId : "...",
        appSecret : "...",
        redirectUri : "http://0.0.0.0:3000/",
        apiVersion: "v2.2"
    }));

app.get('/login', function(req, res) {
    console.log('Start login');
    fbgraph.redirectLoginForm(req, res);    
});

app.get('/', function(req, res) {
    if (!req.hasOwnProperty('facebook')) {
        console.log('You are not logged in');
        return res.redirect('/login');
    }
    /* See http://developers.facebook.com/docs/reference/api/ for more */
    req.facebook.graph('/me', function(err, me) {
        console.log(me);
    });

    req.facebook.graph('/me?fields=id,name', function(err, me) {
        console.log(me);
    });

    req.facebook.me(function(err, me) {
        console.log(me);
    });

    // /me/likes
    req.facebook.my.likes(function(err, likes) {
        console.log(likes);
    });

    res.end("Check console output");
});

server.listen(3000);