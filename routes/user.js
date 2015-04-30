var express = require('express');
var router = express.Router();
var dbtools = require('../utils/dbtools.js');
var GVs = require('../utils/globalvars.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});

/* GET /users/new Form. */
router.get('/new', function(req, res, next) {
  res.render('user/new');
});

/* GET /users/edit Form. */
router.get('/edit/:id([0-9]+)', function(req, res, next) {
  var thisData = new GVs.UserData();
  dbtools.SelectData(req.params.id, thisData.database, thisData.table, function(object){
    thisData.id = object[0];
    thisData.firstname = object[1];
    thisData.lastname = object[2];
    thisData.username = object[3];
    thisData.password = object[4];
    thisData.confirmpassword = object[5];
    thisData.phone = object[6];
    thisData.email = object[7];

    res.render('user/edit', {data: thisData});

  });
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
  var requestData = req.body;
  var objArray = [];
  for(var key in requestData){
    objArray[objArray.length] = requestData[key];
  }
  // NOTE: -needs optimization-
  var thisUserData = new UserData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
  dbtools.InsertData(thisUserData);
  res.send(thisUserData);
});

// POST /uses/edit
// NOTE: dbtools.editData under construction.
router.post('/edit', function(req, res, next){
  var requestData = req.body;
  var objArray = [];
  for(var key in requestData){
    objArray[objArray.length] = requestData[key];
  }
  // NOTE: -needs optimization-
  var thisUserData = new UserData(objArray[0], objArray[1], objArray[2], objArray[3], objArray[4], objArray[5], objArray[6]);
  dbtools.InsertData(thisUserData);
  res.send(thisUserData);
});

// POST /users/delete
router.post('/delete', function(req, res, next){
  var thisUserData = req.body;
  res.send(thisUserData);
});

module.exports = router;
