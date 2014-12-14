var data = require('../Data');
var q = require('q');
var _ = require('underscore');
var passport = require('passport');
var uuid = require('node-uuid');
var encryption = require('../utilities/encryption');

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

function login(req, res) {
    data.users.all().then(function (users) {
        var user = _.findWhere(users, { username: req.body.username });
        if (user === undefined) {
            _httpResponse(res, 404, 'User not found!');
        }

        if (user.passwordHash != encryption.generateHashedPassword(user.salt, req.body.password)) {
            _httpResponse(res, 400, 'Wrong password!');
        }

        user.token = uuid.v4();
        data.users.update(user);

        _httpResponse(res, 200, user.token);
    }, function (err) {
        _httpResponse(res, 400, err.message);
    });
}

function logout(req ,res) {
    var token = req.header('Authorization').split(' ')[1];
    data.users.findByToken(token).then(function (user) {
        user.token = '';
        data.users.update(user);

        _httpResponse(res, 200, 'Logged out!');
    }, function (err) {
        _httpResponse(res, 400, err.message);
    });
}

function _httpResponse(response, statusCode, message) {
    response.statusCode = statusCode;
    response.send(message);
}

module.exports = {
    register: register,
    login: login,
    logout: logout,
}