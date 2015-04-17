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
  var thisEventData = req.body;
  dbtools.InsertData(thisEventData);
  res.send(thisEventData);
});

//POST events/edit
router.post('/edit', function(req, res, next){
  var thisEventData = req.body;

  res.send(thisEventData);
});

//POST events/delete
router.post('/delete', function(req, res, next){
  var thisEventData = req.body;
  res.send(thisEventData);
});

module.exports = router;
