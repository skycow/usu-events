/* Purpose: This is the routes for all of the /events
 *
 * Special Notes: N/A
 *
 * Author: Devyn Cyphers; Devcon
 */
var express = require('express');
var router = express.Router();
var dbtools = require('../utils/dbtools');
var GVs = require('../utils/globalvars');

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.render('event/index');
});

/* GET events/new */
router.get('/new', function(req, res, next) {
  console.log(req.params.id);
  res.render('event/new');
});

/* GET events/event */
router.get('/view', function(req, res, next) {
  res.send('GET /view');
});

/* GET events/edit */
router.get('/edit/:id([0-9]+)', function(req, res, next) {
  var thisData = new GVs.EventData();
  //NOTE: This could be optimized.
  dbtools.SelectData(req.params.id, thisData.database, thisData.table, function(object){
    thisData.id = object[0];
    thisData.title = object[1];
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
  var thisEventData = new GVs.EventData(req.body.title, req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime, req.body.location, req.body.notes);
  dbtools.InsertData(thisEventData);
  res.redirect('/');
});

//POST events/edit
router.post('/edit', function(req, res, next){
  var thisEventData = new GVs.EventData(req.body.title, req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime, req.body.location, req.body.notes);
  thisEventData.id = req.body.id;
  dbtools.SetData(thisEventData);
  res.redirect('/');
});

//POST events/delete
router.post('/delete', function(req, res, next){

});

module.exports = router;
