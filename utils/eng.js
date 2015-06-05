// utils/hsb.js
//   Scrape Engineering calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var engFeed = function() {
    init = function init() {
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
            }
        });		
	   return calendar;
    };
    return {
        feed: init
    };
} ();

module.exports = engFeed;