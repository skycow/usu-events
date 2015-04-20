var express = require('express');
var router = express.Router();
var dbtools = require('../public/dbtools.js');

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

//UserData Constructor: takes firstname(string), lastname(string), username(string), password(string),confirmpassword(string), phone(string), email(string)
//and represents the data for a new table/date.
function UserData(firstname, lastname, username, password, confirmpassword, phone, email){
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.password = password;
  this.confirmpassword = confirmpassword;
  this.phone = phone;
  this.email = email;
}
UserData.prototype = new dbtools.DBData(usuevents, 'userLogin');
