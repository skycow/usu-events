var express = require('express');
var router = express.Router();
var dbtools = require('../utils/dbtools.js');
var GVs = require('../utils/globalvars.js');

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.render('event/index');
});

/* GET events/new */
router.get('/new/:id([0-9]+)', function(req, res, next) {
  console.log(req.params.id);
  res.render('event/new');
});

/* GET events/event */
router.get('/view', function(req, res, next) {
  res.render('event/view');
});

/* GET events/edit */
router.get('/edit/:id([0-9]+)', function(req, res, next) {
  var thisData = new GVs.EventData();
  dbtools.SelectData(req.params.id, thisData.database, thisData.table, function(object){
    thisData.id = object[0];
    thisData.name = object[1];
    thisData.startDate = object[2];
    thisData.startTime = object[3];
    thisData.endDate = object[4];
    thisData.endTime = object[5];
    thisData.location = object[6];
    thisData.notes = object[7];

    res.render('event/edit', {data: thisData});

  });
});

/* GET events/delete */
router.get('/delete', function(req, res, next) {
  res.send('event/delete');
});

// POST events/new
router.post('/new', function(req, res, next) {
  var requestData = req.body;
  var objArray = [];
  for(var key in requestData){
    objArray[objArray.length] = requestData[key];
  }
  // NOTE: -needs optimization-
  var thisEventData = new GVs.EventData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
  dbtools.InsertData(thisEventData);
  res.send(thisEventData);
});

//POST events/edit
// NOTE: dbtools.editData under construction.
router.post('/edit', function(req, res, next){
  var requestData = req.body;
  var objArray = [];
  for(var key in requestData){
    objArray[objArray.length] = requestData[key];
  }
  // NOTE: -needs optimization-
  var thisEventData = new GVs.EventData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
  dbtools.InsertData(thisEventData);
  res.send(thisEventData);
});

//POST events/delete
router.post('/delete', function(req, res, next){
  var thisEventData = req.body;
  res.send(thisEventData);
});

module.exports = router;
