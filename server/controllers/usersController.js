var data = require('../Data');
var q = require('q');
var _ = require('underscore');
var passport = require('passport');

function register(req, res) {
    var newUser = req.body;
    data.users.create(newUser.username, newUser.password).then(function (user) {
        req.login(newUser, function(err) {
            if (err) {
                console.log(err.message);

                // serialization problems
                _httpResponse(res, 400, err.message);
            }
        });

        _httpResponse(res, 201, 'Registration successful!');
    }, function (err) {
        _httpResponse(res, 400, err.message);
    });
}

function login(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send('user not found'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send('logged in successfully as ' + user.username);
        });
    })(req, res, next);
}

function logout(req ,res) {
    req.logout();
    res.send('Logged out!');
}

function _httpResponse(response, statusCode, message) {
    response.statusCode = statusCode;
    response.send(message);
}

module.exports = {
    register: register,
    login: login,
    logout: logout
}