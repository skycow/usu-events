var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('usu-events.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_login (UserID INTEGER PRIMARY KEY,Username TEXT,Password TEXT,Interests TEXT)");
  db.run("CREATE TABLE if not exists event (EventID INTEGER PRIMARY KEY,Name TEXT,Start_Date BLOB,Start_Time BLOB,End_Date BLOB,End_Time BLOB,Days BLOB,Location TEXT)");
  db.run("CREATE TABLE if not exists event_owner (EventID INTEGER, Owner INTEGER, FOREIGN KEY(EventID) REFERENCES event(EventID),FOREIGN KEY(Owner) REFERENCES user(UserID))");

});

db.close();


var users = require('./routes/user');
var events = require('./routes/event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
