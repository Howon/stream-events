module.exports = {
	scrape : function(url_link){
		var noodle = require('noodlejs');

		noodle.query({  
		  url: url_link,
		  type: 'html',
		  selector: 'h2.title',
		  extract: 'text'
		})
		.then(function (results) {
		  console.log(results.results);
		});
	} 
}
