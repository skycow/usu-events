var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dbtools = require('./public/dbtools.js');

//region ---Dbtools Logic---

//Creates a new Database called usuevents.
usuevents = dbtools.CreateDatabase('usuevents');

//Inherit DBData for UserData/EventData.
UserData.prototype = new dbtools.DBData(usuevents, 'userLogin');
EventData.prototype = new dbtools.DBData(usuevents, 'event');
UserData.prototype.new = function(firstname, lastname, username, password, confirmpassword, phone, email){return new UserData(firstname, lastname, username, password, confirmpassword, phone, email)};

//Table variables.
var eventCreator = new EventData('STRING', 'BLOB', 'BLOB', 'BLOB', 'BLOB', 'STRING', 'STRING');
var userLoginCreator = new UserData('STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'BLOB', 'STRING');

var testUser= new UserData();
testUser.id = 1;

//Creates a new Table for usuevents called event.
dbtools.CreateTable(eventCreator);
dbtools.CreateTable(userLoginCreator);
//endregion

//dbtools.SelectData(testUser);

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

//region ---Custom Constructors---

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
    this.id = null;
}

//EventData Constructor: takes name(string), startDate(string), starteTime(string), endDate(string), endTime(string), location(string), notes(string)
//and represents the data for a new table/data.
function EventData(name, startDate, startTime, endDate, endTime, location, notes){
    this.name = name;
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate;
    this.endTime = endTime;
    this.location = location;
    this.notes = notes;
    this.id = null;
}
//endregion

module.exports = app;
