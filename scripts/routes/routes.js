var fbgraph = require('../event/facebook_event'),
	event_handler = require('../event/event_handler'),
	React = require('react/addons'),
	HomePage = React.createFactory(require('../render/pages/main/HomePage')),
	EventPage = React.createFactory(require('../render/pages/event/EventPage'));

module.exports = function(app, passport, io){
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
			var props = {
           	 	user : {
           	 		id : req.user.info.id,
           	 		name : req.user.info.name,
           	 		email : req.user.info.email
           	 	}
          	};
			var reactBody = React.renderToString(HomePage(props));
			res.render('home', {title: 'Venter', user : req.user.info, body: reactBody, APP_PROPS: props});
		}else{
			res.redirect('/');
		}
	});

	app.get('/event/:id', function(req, res){
		if (req.isAuthenticated()){ 
          	var id = req.params.id;
			event_handler.Req_Event(id, req, res, EventPage);
		}else{
			res.redirect('/');
		}
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['user_events']}));
	
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect : '/'}),
		function(req, res){
			fbgraph(req.user.info, io);
			res.redirect('/home');
		});

	// app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']  }));

	// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
	// 	  function(req, res) {
	// 	    res.redirect('/home');
	// 	  });

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}