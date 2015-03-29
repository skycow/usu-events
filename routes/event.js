var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Events' });
});

/* GET events/new */
router.get('/new', function(req, res, next) {
  res.send('GET new');
});

/* GET events/event */
router.get('/view', function(req, res, next) {
  res.send('GET event');
});

/* GET events/edit */
router.get('/edit', function(req, res, next) {
  res.send('GET edit');
});

/* GET events/destroy */
router.get('/destroy', function(req, res, next) {
  res.send('GET destroy');
});

/* POST new */
router.post('/new', function(req, res, next) {
  res.send('POST new');
});

/* POST events/edit-event */
router.post('/edit', function(req, res, next) {
  res.send('POST edit');
});

module.exports = router;
