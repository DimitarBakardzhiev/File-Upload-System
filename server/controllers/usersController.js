var data = require('../Data');
var q = require('q');
var _ = require('underscore');

function register(req, res) {
    var newUser = req.body;

    _validateUsername(newUser.username).then(function (username) {
       console.log(username + ' is valid!');
    }, function (err) {
        console.log(err.message);
    });

    // data.users.create(newUser.username, newUser.password);
    // TODO: authenticate after successful registeration
    res.end();
}

function _validateUsername(username) {
    var deferred = q.defer();
    if (username.length < 6) {
        deferred.reject(new Error('Username is too short! It must be at least 6 characters!'));
    } else if (username.length > 20) {
        deferred.reject(new Error('Username is too long! It must be not more than 20 characters!'));
    } else if (_.findWhere(data.users.all(), { username: username }) !== null) {
        deferred.reject(new Error('Username already exists!'));
    } else {
        deferred.resolve(username);
    }

    return deferred.promise;
}

module.exports = {
    register: register
}