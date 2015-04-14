var express = require('express');
var router = express.Router();

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

router.post('/new', function(req, res, next) {
  var thisEventData = req.body;
  res.send(thisEventData);
});

router.post('/edit', function(req, res, next){
  var thisEventData = req.body;
  res.send(thisEventData);
});

router.post('/delete', function(req, res, next){
  var thisEventData = req.body;
  res.send(thisEventData);
});

module.exports = router;
