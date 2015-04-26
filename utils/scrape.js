// utils/scrape.js

var cheerio = require('cheerio');
var request = require('request');

urls = [
    {
        title: 'hsb',
        url: 'http://huntsman.usu.edu/fjmcenter/htm/'
                +'calendar/displayBy=next10/rss=true'
    },
    {
        title: 'cca',
        url: 'http://cca.usu.edu/events/'
    }
];

hsbUrl = 'http://huntsman.usu.edu/fjmcenter/htm/'
            +'calendar/displayBy=next10/rss=true';

var $, calendarItem;

// request(hsbUrl, function(error,response,html) {
//     if(!error) {
//         $ = cheerio.load(html, { 
//                 xmlMode: true,
//                 normalizeWhitespace: true
//             });
//         // var calendarItem;
//         var hsbCalendar = [];

//         $('item').each(function(idx,el) {
//             calendarItem = {};

//             calendarItem.title = $(el).children('title').text();
//             calendarItem.link = $(el).children('link').text();
//             calendarItem.description = $(el).children('description').text();
//             calendarItem.date = $(el).children('pubDate').text();

//             hsbCalendar.push(calendarItem);
//         });
//         // console.log(hsbCalendar);
//     }
// });

request(urls[1].url, function(error,response,html) {
    if(!error) {
        $ = cheerio.load(html, {
            normalizeWhitespace: true,
            decodeEntities: true
        });

        var ccaCalendar = [];
        var testVar;

        $('.rssFeed').each(function(idx,el) {
            calendarItem = {};
            calendarItem.link = $(el).children('h3').children('a').attr('href');
            calendarItem.title = $(el).children('h3').children('a').html();

            $(el).children('p').each(function(idx,nestEl) {
                content = $(nestEl).html();

                // if(content)

                console.log(content);
            });

            // console.log(calendarItem);

            // testVar = $(el).children('p').contents();

            // console.log(testVar);
            // console.log($(el).children('p'));

            // calendarItem.description = $(el).children('p')[1].text();
            // calendarItem.date = $(el).children('p')[0].html();

            ccaCalendar.push(calendarItem);
        });
        // console.log(ccaCalendar);
    }
});
