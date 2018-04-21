var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser');

// --
// Connect mongoose
mongoose.connect('mongodb://localhost:27017/nodedb'); 

// mongoose.connect('mongodb://heroku_mjmmjxj7:1ldblnllj5u3oi4lcdchf135he@ds247619.mlab.com:47619/heroku_mjmmjxj7', function(err) {
// 	if (err) {
// 		console.log('Could not connect to MongoDB!');
// 	}
// });

// sudo fuser -k 80/tcp
// --
// Set express configs
process.env.PORT = process.env.PORT || 5000;
app.set('port', process.env.PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(require('express-session')({ 
		secret: 'keyboard cat',
		resave: false,
  		saveUninitialized: true
 }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')();

// --
// Define routes/controller
require('./routes/webportal')(app);

// Start server
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;