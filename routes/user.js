var express = require('express');
var router = express.Router();

/* GET /users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});

/* GET /users/new Form. */
router.get('/new', function(req, res, next) {
  res.render('user/new');
});

/* GET /users/edit Form. */
router.get('/edit', function(req, res, next) {
  res.render('user/edit');
});

/* GET /users/view call */
router.get('/view', function(req, res, next) {
  res.render('user/view');
});

/* GET /users/delete call */
router.get('/delete', function(req, res, next) {
  res.send('user/delete call');
});

// POST users/new
router.post('/new', function(req, res, next) {
  var thisUserData = req.body;
  res.send(thisUserData);
});

// POST /uses/edit
router.post('/edit', function(req, res, next){
  var thisUserData = req.body;
  res.send(thisUserData);
});

// POST /users/delete
router.post('/delete', function(req, res, next){
  var thisUserData = req.body;
  res.send(thisUserData);
});

module.exports = router;
