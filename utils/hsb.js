// utils/hsb.js
//   Scrape HSB calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var url = 'http://huntsman.usu.edu/fjmcenter/htm/' +
            'calendar/displayBy=next10/rss=true';
var $, item;
var calendar = [];

exports.hsbFeed = function hsbFeed() {
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
	    }
	});
	console.log("hsb calendar");
	console.log(calendar);
	return calendar;
};

//var hsbFeed = function hsbFeed() {
//	var options = {
//		host: 'http://huntsman.usu.edu',
//		port: 80,
//		path: '/fjmcenter/htm/' +
//            'calendar/displayBy=next10/rss=true'
//	};
//	http.get(options, function(resp) {
//		console.log(arguments);
//		console.log("STATUS: ",resp.statusCode);
//	});
//};
