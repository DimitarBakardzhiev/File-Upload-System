module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/FileUploadSystem');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('Database up and running!');
    });

    require('../models/User')(mongoose);
    require('../models/File')(mongoose);
    require('../utilities/seed')();
}