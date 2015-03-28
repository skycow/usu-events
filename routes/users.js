var express = require('express');
var router = express.Router();

/* GET /users listing. */
router.get('/', function(req, res, next) {
  res.send('/users listing');
});

/* GET /users/new Form. */
router.get('/new', function(req, res, next) {
  res.send('/users/new Form');
});

/* GET /users/edit Form. */
router.get('/edit', function(req, res, next) {
  res.send('/users/edit Form');
});

/* GET /users/view call */
router.get('/view', function(req, res, next) {
  res.send('/users/view call');
});

/* GET /users/delete call */
router.get('/delete', function(req, res, next) {
  res.send('/users/delete call');
});

module.exports = router;
