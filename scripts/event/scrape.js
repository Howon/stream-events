var noodle = require('noodlejs');

module.exports = {
	scrape : function(){

		// noodle.query({  
		//   url: 'https://www.facebook.com/events/1381261678869874',
		//   type: 'html',
		//   selector: 'a._5xhk',
		//   extract: 'text'
		// })
		// .then(function (results) {
		// 	  console.log(results.results);
		// });
var osmosis = require('osmosis');

		osmosis
		.get('https://www.facebook.com/events/1381261678869874') 
		.find('a._5xhk')
		.set('articleContent')
		.data(function(listing) {
			console.log('found: ')
		    console.log(listing)
		})
	} 
}
