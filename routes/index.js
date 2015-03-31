var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index',{
  	title: 'Simple Chat Service'
  });
});

router.get('/logout', function(req, res){
	res.render('auth',{
		title: 'Login'
	})
});

module.exports = router;
