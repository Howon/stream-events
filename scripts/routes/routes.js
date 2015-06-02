module.exports = function(app, passport){
	app.get('/', function(req, res) {
		if (req.isAuthenticated()){ 
			res.redirect('/home');
		}else{
			res.render('login',{
	    		title: 'Venter'
	    	});
		}
	});

	app.get('/home', function(req, res){
		if (req.isAuthenticated()){ 
			res.render('index', {title: 'Venter', user : req.user});
		}else{
			res.redirect('/');
		}
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect : '/'}),
		function(req, res){
			console.log(req.user);
			res.redirect('/home');
		});

	app.get('/auth/google', passport.authenticate('google', { scope : 'https://www.googleapis.com/auth/plus.login' }));

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
		  function(req, res) {
		  	console.log(req.user)
		    res.redirect('/home');
		  });

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}
