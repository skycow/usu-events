// utils/scrape.js

var cheerio = require('cheerio');
var request = require('request');

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error,response,html) {
    if(!error) {
        var $ = cheerio.load(html);
        //console.log('being html');
	//console.log(html);
	//console.log('end html');
	console.log(html);

    }
});
