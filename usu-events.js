var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dbtools = require('./utils/dbtools');
var GVs = require('./utils/globalvars');

//region ---Dbtools Logic---

//Table variables.
var eventCreator = new GVs.EventData('TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT');
var userLoginCreator = new GVs.UserData('TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT', 'BLOB', 'TEXT');

//Creates a new Table for usuevents called event.
dbtools.CreateTable(eventCreator);
dbtools.CreateTable(userLoginCreator);
//endregion

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
