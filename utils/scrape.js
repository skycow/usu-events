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
			 callback(calendar);
	    }
	});
};
function engInit(callback) {
	var url = 'http://engineering.usu.edu/htm/calendar/rss=true';
        var calendar = [];
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
				 callback(calendar);
            }
        });
};
//function ccaInit(callback) {
//	callback();
//};

var hsbFeed = hsbInit(function(resp) {
	console.log("\n\nInside callback of hsbInit\n",resp);
});
var engFeed = engInit(function(resp) {
	console.log("\n\nInside callback of engInit\n",resp);
});
//var ccaFeed = ccaInit(function(resp) {
//	console.log("\n\nInside callback of ccaInit\n",resp);
//});





