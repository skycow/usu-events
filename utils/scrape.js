// utils/scrape.js

var cheerio = require('cheerio');
var request = require('request');

var urls = [
    {
        title: 'hsb',
        url: 'http://huntsman.usu.edu/fjmcenter/htm/'
                +'calendar/displayBy=next10/rss=true'
    },
    {
        title: 'eng',
        url: 'http://engineering.usu.edu/htm/calendar/rss=true'
    },
    {
        title: 'cca',
        url: 'http://cca.usu.edu/events/'
    }
];

var eventUrl = 'http://www.usu.edu/calendar/rss/eventcalendar.xml';
var ususaUrl = 'http://www.usu.edu/ususa/calendar/';

var $, calendarItem;

// turns out, USU has a main event calendar rss... doh!
 request(eventUrl, function(error,response,html) {
     if(!error) {
         $ = cheerio.load(html, {
                 xmlMode: true,
                 normalizeWhiteSpace: true
         });
         var mainCalendar = [];

         $('item').each(function(idx,el) {
             calendarItem = {};

             calendarItem.title = $(el).children('title').text();
             calendarItem.link = $(el).children('guid').text();
             calendarItem.category = $(el).children('category').text();
             calendarItem.description = $(el).children('description').text();
             calendarItem.location = $(el).children('location').text();
             calendarItem.date = $(el).children('pubDate').text();

             mainCalendar.push(calendarItem);

         });
         console.log(mainCalendar);
     }
 });

//  ...and USUSA has a calendar of their own
request(ususaUrl, function(error,reponse,html) {
    if(!error) {
        $ = cheerio.load(html, {
                normalizeWhiteSpace: true
        });

        var ususaCalendar = [], temp;

        $('#content-container .row').each(function(idx,el) {
            calendarItem = {};

            calendarItem.title = $(el).children('h3').text();
            calendarItem.date = $(el).children('.date').text();
            calendarItem.description = $(el).children('p').text();

            temp = $(el).find('.descrow')[0];
            calendarItem.time = $(temp).text();

            temp = $(el).find('a')[1];
            calendarItem.link = 'http://www.usu.edu' + 
                $(temp).attr('href');

            temp = $(el).find('.desc2')[0];
            calendarItem.location = $(temp).text();

            // testvar = $(el).find('a')[1];

            // console.log( $(testvar).attr('href') );

            // calendarItem.time = $(el).find('.descrow')[0].text();
            // calendarItem.link = $(el).children('.descrow')[1].children('.desc2')[1].html();

            console.log(calendarItem);

        });
    }
});


// go get the business calendar rss feed, and scrape it
// request(urls[0].url, function(error,response,html) {
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

// go get the engineering calendar rss feed, and scrape it
// request(urls[1].url, function(error,response,html) {
//     if(!error) {
//         $ = cheerio.load(html, { 
//                 xmlMode: true,
//                 normalizeWhitespace: true
//             });
//         // var calendarItem;
//         var engCalendar = [];

//         $('item').each(function(idx,el) {
//             calendarItem = {};

//             calendarItem.title = $(el).children('title').text();
//             calendarItem.link = $(el).children('link').text();
//             calendarItem.description = $(el).children('description').text();
//             calendarItem.date = $(el).children('pubDate').text();

//             engCalendar.push(calendarItem);
//         });
//         // console.log(engCalendar);
//     }
// });

// go get the cca calendar rss feed, and scrape it
// request(urls[2].url, function(error,response,html) {
//     if(!error) {
//         $ = cheerio.load(html, {
//             normalizeWhitespace: true,
//             decodeEntities: true
//         });

//         var ccaCalendar = [];
//         var testVar;

//         $('.rssFeed').each(function(idx,el) {
//             calendarItem = {};
//             calendarItem.link = $(el).children('h3').children('a').attr('href');
//             calendarItem.title = $(el).children('h3').children('a').html();

//             $(el).children('p').each(function(idx,nestEl) {
//                 content = $(nestEl).html();

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
//         });
//         // console.log(ccaCalendar);
//     }
// });
