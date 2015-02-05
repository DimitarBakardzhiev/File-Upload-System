module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/FileUploadSystem');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database up and running!');
    });

    require('../models/user')();
    require('../models/file')();
    require('../utilities/seed')();
}