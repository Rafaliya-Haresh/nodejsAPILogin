'use strict';

var users = require('../controllers/users')
var cors = require('cors');

module.exports = function(app) {
	// --
	// Product

	app.use(cors());
	app.post('/api/v1/user/signin', users.signin);
	app.post('/api/v1/user/signup', users.signup);
	app.get('/api/v1/user/logout', users.logout);

	app.get('/api/v1/userlist', users.getUsers);
}