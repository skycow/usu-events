// utils/scrape.js
//   Main interface for accessing calendar feeds.
//   by: anhany 2015-04-30

require('./cca.js');
var hsb = require('./hsb.js');
require('./ususa.js');
require('./eng.js');

// Documentation is forthcoming.

var hsbInfo = hsb.hsbFeed();
console.log(hsbInfo);