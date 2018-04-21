'use strict';
var passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


// --
// User login
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.status(500).send(err);
		};

		if (info) {
			return res.status(401).send(info);
		};

		delete user.password;

		req.login(user, function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				return res.status(200).send({ message: "User has been loggedin successfully." });
			}
		});
	})(req, res, next);
};

// --
// User signup
exports.signup = function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) {
			return res.status(400).send(err);
		};

		if (info) {
			return res.status(400).send(info);
		};
		res.end();
	})(req, res, next);
};


// --
// User logout
exports.logout = function(req, res, next) {
	req.logout();
	req.session.destroy();
	return res.status(200).send({ message: "User has been logout successfully." });
};


// 
// Get Users
exports.getUsers = function(req, res){

	User.find({}, function(err, result){
		if(err){
			return res.status(400).send(err);
		}
		if(!result){
			return res.status(200).send({'data': 'No any Data'});	
		}
		return res.status(200).send(result);
	});
}