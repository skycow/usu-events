// utils/cca.js
//   Scrape CCA calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var url = "http://cca.usu.edu/events/";
var $, item;
var calendar = [];

var ccaFeed = function ccaFeed() {
	request(url, function(error, resp, html) {
		if(!error) {
			$ = cheerio.load(html, {
        	     normalizeWhitespace: true,
    	         decodeEntities: true
	         });

			$('.rssFeed').each(function(idx,el) {
            	item = {};
                item.link = $(el).children('h3').children('a').attr('href');
                item.title = $(el).children('h3').children('a').html();

//                $(el).children('p').each(function(idx,nestEl) {
//                    content = $(nestEl).html();

//                 // if(content)

//                 console.log(content);
//             });

//             // console.log(calendarItem);

//             // testVar = $(el).children('p').contents();

//             // console.log(testVar);
//             // console.log($(el).children('p'));

//             // calendarItem.description = $(el).children('p')[1].text();
//             // calendarItem.date = $(el).children('p')[0].html();

//             ccaCalendar.push(calendarItem);
        	});
//         // console.log(ccaCalendar);
		}
	});		
	return calendar;
};
