// utils/scrape.js
//   Main interface for accessing calendar feeds.
//   by: anhany 2015-04-30

//var hsb = require('./hsb.js');
//var eng = require('./eng.js');
//require('./cca.js');
//require('./ususa.js');

var cheerio = require('cheerio');
var request = require('request');

//  hsb feed
function hsbInit(callback) {
	var calendar = [];
	var url = 'http://huntsman.usu.edu/fjmcenter/htm/' +
	            'calendar/displayBy=next10/rss=true';
	var $, item;
	request(url, function(error, resp, html) {
		if(!error) {
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
	             calendar.push(item);
	         });
			 console.log("inside request:", calendar);
			 callback(calendar);
	    }
	});
};

var hsbFeed = hsbInit(function(resp) {
	console.log("\nIniside callback of hsbInit\n\n",resp);
});

console.log("\nhsb.feed()\n",hsbFeed);




