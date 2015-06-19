var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

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
	return '42';
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
	//console.log("\n\nInside callback of hsbInit\n",resp);
	//return resp[1].title;
});



console.log("\n\nhsbFeed:\n", hsbInit(function(resp) {
	console.log("\n\nInside callback of hsbInit\n",resp[1].title);
	//eturn resp[1].title;
}));

var engFeed = engInit(function(resp) {
	console.log("\n\nInside callback of engInit\n",resp);
});


  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.send('GET about');
});

module.exports = router;
