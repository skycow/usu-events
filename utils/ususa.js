// utils/ususa.js
//   Scrape USUSA calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.usu.edu/ususa/calendar/';
var $, item;
var calendar = [];

var ususaFeed = function ususaFeed() {
	request(url, function(error, resp, html) {
		if(!error) {
	        $ = cheerio.load(html, {
	                normalizeWhiteSpace: true
	        	});
	
	        var temp;
	
	        $('#content-container .row').each(function(idx,el) {
	            item = {};
	
	            item.title = $(el).children('h3').text();
	            item.date = $(el).children('.date').text();
	            item.description = $(el).children('p').text();
	
	            temp = $(el).find('.descrow')[0];
	            item.time = $(temp).text();
	
	            temp = $(el).find('a')[1];
	            item.link = 'http://www.usu.edu' + 
	                $(temp).attr('href');
	
	            temp = $(el).find('.desc2')[0];
	            item.location = $(temp).text();
	
	            // testvar = $(el).find('a')[1];
	
	            // console.log( $(testvar).attr('href') );
	
	            // item.time = $(el).find('.descrow')[0].text();
	            // item.link = $(el).children('.descrow')[1].children('.desc2')[1].html();
	
	            console.log(item);
	
	       	});
    	}
	});		
	return calendar;
};
