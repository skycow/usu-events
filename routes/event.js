var express = require('express');
var router = express.Router();
var dbtools = require('../public/dbtools.js');

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.render('event/index');
});

/* GET events/new */
router.get('/new', function(req, res, next) {
  res.render('event/new');
});

/* GET events/event */
router.get('/view', function(req, res, next) {
  res.render('event/view');
});

/* GET events/edit */
router.get('/edit', function(req, res, next) {
  res.render('event/edit');
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
  var thisEventData = new EventData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
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
  var thisEventData = new EventData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
  dbtools.InsertData(thisEventData);
  res.send(thisEventData);
});

//POST events/delete
router.post('/delete', function(req, res, next){
  var thisEventData = req.body;
  res.send(thisEventData);
});

module.exports = router;

//EventData Constructor: takes name(string), startDate(string), starteTime(string), endDate(string), endTime(string), location(string), notes(string)
//and represents the data for a new table/data.
function EventData(name, startDate, startTime, endDate, endTime, location, notes){
  this.name = name;
  this.startDate = startDate;
  this.startTime = startTime;
  this.endDate = endDate;
  this.endTime = endTime;
  this.location = location;
  this.notes = notes;
}
EventData.prototype = new dbtools.DBData(usuevents, 'event');
