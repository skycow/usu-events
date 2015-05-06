// utils/scrape.js
//   Main interface for accessing calendar feeds.
//   by: anhany 2015-04-30

var hsb = require('./hsb');
//var eng = require('./eng.js');
//require('./cca.js');
//require('./ususa.js');

var hsbFeed = hsb.init(function() {
	console.log("feed args:", arguments);
});
console.log("hsb:",hsb);
console.log(hsbFeed);

//var engFeed = eng.feed();
//console.log("eng", engFeed);
