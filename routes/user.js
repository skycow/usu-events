/* Purpose: This is the routes for all of the /User
 *
 * Special Notes: N/A
 *
 * Author: Devyn Cyphers; Devcon
 */
var express = require('express');
var router = express.Router();
var dbtools = require('../utils/dbtools');
var GVs = require('../utils/globalvars');

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
  // NOTE: Could be optimized.
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
  var thisUserData = new GVs.UserData(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.confirmpassword, req.body.phone, req.body.email);
  dbtools.InsertData(thisUserData);
  res.redirect('/');
});

// POST /user/edit
// NOTE: dbtools.setData under construction.
router.post('/edit', function(req, res, next){
  var thisUserData = new GVs.UserData(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.confirmpassword, req.body.phone, req.body.email);
  thisUserData.id = req.body.id;
  dbtools.SetData(thisUserData);
  res.redirect('/');
});

// POST /users/delete
router.post('/delete', function(req, res, next){
  var thisUserData = req.body;
});

module.exports = router;
