var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login',{
  	title: 'Stream Events'
  });
});

router.get('/home', function(req, res){
	res.render('index',{
		title: 'Stream Events'
	})
});

module.exports = router;
