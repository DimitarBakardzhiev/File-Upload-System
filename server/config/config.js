/**
 * Created by Dimitar on 8.1.2015 г..
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/FileUploadSystem',
        port: process.env.PORT || 3001
    },
    production: {
        rootPath: rootPath,
        db: 'production connection string',
        port: process.env.PORT || 3001
    }
}