// utils/hsb.js
//   Scrape HSB calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

feed =(function () {
	function init(cb) {
		var url = 'http://huntsman.usu.edu/fjmcenter/htm/' +
		            'calendar/displayBy=next10/rss=true';
		var cal = [];
		var $, item;
		request(url,function (error,response,html) {
			if(error) { return console.log(error); }	
			$ = cheerio.load(html, { 
			     xmlMode: true,
			     normalizeWhitespace: true
			 });
			
			$('item').each(function(idx,el) {
				item = {};
				item.title = $(el).children('title').text();
				item.link = $(el).children('link').text();
				item.description = $(el).children('description').text();
				item.date = $(el).children('pubDate').text();
				cal.push(item);
			});
			console.log("inside request callback:%s\n\n", cal);
		});
		console.log("Outside request callback:\n",cal,"\n\n");
		cb(cal);
	};
	
	return {
		init: init	
	};
})();

module.exports = feed;
