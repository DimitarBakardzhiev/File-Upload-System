var File = require('mongoose').model('File');
var encryption = require('../utilities/encryption');
var q = require('q');

function create(fileName, isPrivate) {
    var deferred = q.defer();
    
    // TODO: encrypt file name, save to db

    return deferred.promise;
}

function find(id) {
    var deferred = q.defer();
    File.findById(id, function (err, file) {
        if (err) {
            deferred.reject(new Error(err.message));
        }

        deferred.resolve(file);
    });

    return deferred.promise;
}

function update(file) {
    var deferred = q.defer();
    file.update({ _id: file._id}, file, { upsert: true }, function (err, updated) {
        if (err) {
            deferred.reject(new Error(err.message));
        }

        deferred.resolve(updated);
    });

    return deferred.promise;
}

function remove(file) {
    var deferred = q.defer();
    File.remove({ _id: file._id }, function (err, removedFile) {
        if (err) {
            deferred.reject(new Error(err.message));
        }

        deferred.resolve(removedFile);
    });

    return deferred.promise;
}

function all() {
    var deferred = q.defer();
    File.find({}, function (err, files) {
        if (err) {
            console.log(err.message);
            deferred.reject(new Error(err.message));
        } else {
            deferred.resolve(files);
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