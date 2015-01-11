var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var bodyParser = require('body-parser');
var flash = require("connect-flash");
var passport = require("passport");

//libs
var mongoose = require("./libs/database");
var loader = require("./libs/loader");
var auth = require("./libs/authentication");

var app = express();
var sessionStore;
mongoose.connection.once("open", function(err){
    if(err) throw err
    sessionStore = new MongoStore({mongoose_connection:mongoose.connection});
});

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

//load routes and models
loader(app);

//do authentication bits
auth(app);

module.exports = app;
