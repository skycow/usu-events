// utils/scrape.js
//   Main interface for accessing calendar feeds.
//   by: anhany 2015-04-30

var hsb = require('./hsb');
//var eng = require('./eng.js');
//require('./cca.js');
//require('./ususa.js');

hsb.init(function(calObj) {
	console.log("scrape hsb callback:\n",calObj,"\n\n");
});
//console.log("hsb:",hsb);
//console.log(hsbFeed);

//var engFeed = eng.feed();
//console.log("eng", engFeed);
