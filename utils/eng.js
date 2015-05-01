// utils/hsb.js
//   Scrape HSB calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var url = 'http://engineering.usu.edu/htm/calendar/rss=true';
var $, item;
var calendar = [];

var engFeed = function engFeed() {
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