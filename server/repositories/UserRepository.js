var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');
var q = require('q');

function create(username, password) {
    var deferred = q.defer();
    var salt = encryption.generateSalt();
    var passwordHash = encryption.generateHashedPassword(salt, password);
    var user = new User({
        username: username,
        salt: salt,
        passwordHash: passwordHash,
        points: 0,
        token: ''
    }).save(function (err, user) {
           if (err) {
               deferred.reject(new Error(err.message));
           }

            deferred.resolve(user);
        });

    return deferred.promise;
}

function find(id) {
    var deferred = q.defer();
    User.findById(id, function (err, user) {
       if (err) {
           deferred.reject(new Error(err.message));
       }

        deferred.resolve(user);
    });

    return deferred.promise;
}

function update(user) {
    var deferred = q.defer();
    //User.findOneAndUpdate({ _id: user._id }, user, { upsert: true }, function (err, updatedUser) {
    //    if (err) {
    //        deferred.reject(new Error(err.message));
    //    }
//
    //    deferred.resolve(updatedUser);
    //});
    User.update({ _id: user._id}, user, { upsert: true }, function (err, updated) {
        if (err) {
            deferred.reject(new Error(err.message));
        }

        deferred.resolve(updated);
    });

    return deferred.promise;
}

function remove(user) {
    var deferred = q.defer();
    User.findByIdAndRemove({ _id: user._id }, function (err, removedUser) {
        if (err) {
            deferred.reject(new Error(err.message));
        }

        deferred.resolve(removedUser);
    });

    return deferred.promise;
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