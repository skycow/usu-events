var express = require('express');
var router = express.Router();
var dbtools = require('../utils/dbtools');
var GVs = require('../utils/globalvars');

/* GET home page. */
router.get('/', function(req, res, next) {
  var thisData = new GVs.EventData();
  //NOTE: This could be optimized.
  dbtools.selectEvents(thisData.database, function(object){
    thisData.id = object[0];
    thisData.title = object[1];
    thisData.startDate = object[2];
    thisData.startTime = object[3];
    thisData.endDate = object[4];
    thisData.endTime = object[5];
    thisData.location = object[6];
    thisData.notes = object[7];

    res.render('index', {
      title: 'USU Events',
      data: thisData
    });
  });
});

/* GET About Page */
router.get('/about', function(req, res, next) {
  res.render('about', {title: 'About'});
});

module.exports = router;
