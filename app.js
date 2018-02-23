/**
 * Main file
 */
var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

//initialize app
var app = express();

/**
 * setup view engine ejs and view folder  to store view files
 */
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

/**
 * set up static path for storing files like css and js
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Using Body parser middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));


//Global vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    res.locals.singleuser = null;
    next();

})

// GET home page, redirecting to persons page.
app.get('/', function(req, res) {
    res.redirect('/persons');
});

/**
 * Including the route file for persons
 */
var persons = require('./persons.js');
app.use('/persons', persons);
/**
 * Check the app running in port 3000
 */
app.listen(3000, function () {
    console.log("started");
});

