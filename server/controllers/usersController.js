var data = require('../Data');
var q = require('q');
var _ = require('underscore');

function register(req, res) {
    var newUser = req.body;
    data.users.create(newUser.username, newUser.password).then(function (user) {
        _httpResponse(res, 201, 'Registration successful!');
    }, function (err) {
        _httpResponse(res, 400, err.message);
    });

    // TODO: authenticate after successful registration
}

function _httpResponse(response, statusCode, message) {
    response.statusCode = statusCode;
    response.send(message);
}

module.exports = {
    register: register
}