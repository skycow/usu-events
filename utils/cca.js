// utils/cca.js
//   Scrape CCA calendar
//   by: anhany 2015-04-30

var cheerio = require('cheerio');
var request = require('request');

var url = "http://cca.usu.edu/events/";
var $, item;
var calendar = [];

(function ccaFeed() {
	request(url, function(error, resp, html) {
		if(!error) {
			$ = cheerio.load(html, {
        	     normalizeWhitespace: true,
    	         decodeEntities: true
	         });

			$('.rssFeed').each(function(index,el) {
            	item = {};
                item.link = $(el).children('h3').children('a').attr('href');
                item.title = $(el).children('h3').children('a').html();
			
//				console.log(el);
				
                $(el).find('p').each(function(idx,nestEl) {

					content = $(nestEl)[0].lastChild.data;
					
					if (idx === 0 {; // Date
					
					} else if (idx === 1) {; // Description
					
					} else if (idx === 3) {; // Is this a Long Description or a Location???
					
					}
//                 // if(content)

                 console.log(content, idx);
             });

			// *** The lines below will get down into the strings of the p tags, skipping the <strong> tag inside.
			//$('.rssFeed').each(function (index, el) {
			//  console.log($(el).find('p').length);
			//  console.group();
			//    $(el).find('p').each(function (idx, nestEl) {
			//      x = $(nestEl)[0].lastChild.data;
			//      
			//      console.log(x, idx);
			//    });
			//  console.groupEnd();
			//});

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
}) ();