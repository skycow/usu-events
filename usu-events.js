var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dbtools = require('./public/dbtools.js');

// Create database if it doesn't exist.
// NOTE: This is only a SQLite3 Database, we may want to
// change to PostgreSQL at a later time.
var sqlite3 = require('sqlite3').verbose();
database = new sqlite3.Database('usu-events.db');
var check;
database.serialize(function() {

  database.run("CREATE TABLE if not exists user_login (UserID INTEGER PRIMARY KEY,Username TEXT,Password TEXT,Interests TEXT)");
  database.run("CREATE TABLE if not exists event (EventID INTEGER PRIMARY KEY,Name BLOB,Start_Date BLOB,Start_Time BLOB,End_Date BLOB,End_Time BLOB,Location BLOB,Notes BLOB)");
  database.run("CREATE TABLE if not exists event_owner (EventID INTEGER, Owner INTEGER, FOREIGN KEY(EventID) REFERENCES event(EventID),FOREIGN KEY(Owner) REFERENCES user(UserID))");

});

//DEBUG ONLY
//dbtools.DEBUG(database);

//database.close();

//Custom objects
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Include Routes for user and event
var users = require('./routes/user');
var events = require('./routes/event');

// Initialize Express Application
var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create a 'virtual' directory named /assets for bower_components to be accessible.
app.use('/assets',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/user', users);
app.use('/event', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
