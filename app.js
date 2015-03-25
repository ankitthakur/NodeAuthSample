var express = require("express");
var app = express();
var port = process.env.PORT || 3030;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

// var configDB = require("./config/database.js");

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

/* express config */
var MongooseConfig = require('./config/database.js'),
mongooseConfig = new MongooseConfig();
var url = mongooseConfig.mongoUrl;
mongoose.connect(url, function (err) {
	// if we failed to connect, abort
	if (err) {
		throw err;
	}
	// we connected ok
});

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating


require('./config/passport')(passport); // pass passport for configuration
///// MAIN PART of Authentication //////

app.use(session({secret:"ilovedaarruuuuuuandsuttaaaa"}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
require("./app/routes.js")(app, passport); // load routes and pass in our application and fully configured passport


// launch
app.listen(port);
console.log('server is listening on port : ' + port)



