var data = require('../Data');
var q = require('q');
var _ = require('underscore');

function register(req, res) {
    var newUser = req.body;

    //_validateUsername(newUser.username).then(function (username) {
    //    var message = username + ' is valid!';
    //    console.log(message);
    //    _httpResponse(res, 201, message);
    //}, function (err) {
    //    console.log(err.message);
    //    _httpResponse(res, 400, err.message);
    //});

    data.users.create(newUser.username, newUser.password);
    // TODO: authenticate after successful registeration
    res.end();
}

function _validateUsername(username) {
    var deferred = q.defer();
    if (username.length < 6) {
        deferred.reject(new Error('Username is too short! It must be at least 6 characters!'));
    } else if (username.length > 20) {
        deferred.reject(new Error('Username is too long! It must be not more than 20 characters!'));
    } else if (_usernameAlreadyExists(data.users.all()), username) {
        deferred.reject(new Error('Username already exists!'));
    } else {
        deferred.resolve(username);
    }

    return deferred.promise;
}

function _usernameAlreadyExists(usersPromise, username) {
    usersPromise.then(function (users) {
        for (var i = 0, len = users.length; i < len; i++) {
            if (users[i].username === username) {
                return true;
            }
        }
    });

    return false;
}

function _httpResponse(response, statusCode, message) {
    response.statusCode = statusCode;
    response.send(message);
}

module.exports = {
    register: register
}