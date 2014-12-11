var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');
var q = require('q');

function create(username, password) {
    var salt = encryption.generateSalt();
    var passwordHash = encryption.generateHashedPassword(salt, password);
    var user = new User({
        username: username,
        salt: salt,
        passwordHash: passwordHash,
        points: 0
    }).save(function (err, user) {
           if (err) {
               console.log(err);
           }

            console.log(user);
        });
}

function find(id) {
    User.findById(id, function (err, user) {
       if (err) {
           console.log(err);
       }

        return user;
    });
}

function update(user) {
    User.findOneAndUpdate(user._id, user, function (err, updatedUser) {
        console.log(updatedUser);
    });
}

function remove(user) {
    User.findByIdAndRemove(user._id);
}

function all() {
    var deferred = q.defer();
    User.find({}, function (err, users) {
        if (err) {
            console.log(err.message);
            deferred.reject(new Error(err.message));
        } else {
            deferred.resolve(users);
        }
    });

    return deferred.promise;
}

module.exports = {
    all: all,
    create: create,
    find: find,
    update: update,
    remove: remove
}