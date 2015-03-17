/**
 * Created by Dimitar on 8.2.2015 г..
 */
var File = require('mongoose').model('File');
var busboy = require('connect-busboy');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var path = require('path');

module.exports = {
    upload: function (req, res, next) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        var isPrivate = undefined;
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            if (filename.length === 0) {
                res.statusCode = 400;
                res.json({
                    message: 'No file selected!'
                });
            }

            console.log("Uploading: " + filename);

            // create 'files' folder if it doesn't exist
            var filePath = path.join(config.rootPath, 'files');
            fs.exists(filePath, function (exists) {
                if (!exists) {
                    fs.mkdir(filePath);
                }

                // create '<username>' folder if it doesn't exist
                filePath = path.join(config.rootPath, 'files', req.user.username);
                fs.exists(filePath, function (exists) {
                    if (!exists) {
                        fs.mkdir(filePath);
                    }

                    fstream = fs.createWriteStream(path.join(filePath, filename));
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        console.log("Upload Finished of " + filename);

                        new File({
                            url: filePath,
                            dateOfUploading: new Date(),
                            fileName: filename,
                            isPrivate: isPrivate,
                            uploaderId: req.user._id
                        }).save(function (err, file) {
                                if (err) {
                                    console.log(err);
                                }

                                res.redirect('/');
                            });
                    });
                });
            });
        });

        req.busboy.on('field', function (fieldName, value) {
            console.log(fieldName + ": " + value);
            isPrivate = value;
        });
    },

    allUserFiles: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        File.find({ uploaderId: req.user._id }, function (err, files) {
            if (err) {
                console.log(err);
            }

            return res.json(files);
        });
    },

    update: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        var id = req.params.id;
        File.findByIdAndUpdate(id, {
            fileName: req.body.fileName,
            isPrivate: req.body.isPrivate
        }, function (err, file) {
            if (err) {
                console.log(err);
            }

            return res.end();
        });
    },
    
    download: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        var id = req.params.id;

        File.findById(id, function (err, file) {
            if (err) {
                console.log(err);
            }

            var filePath = path.join(file.url, file.fileName);
            return res.download(filePath);
        });
    },

    delete: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        var id = req.params.id;

        File.findByIdAndRemove(id, function (err, file) {
            if (err) {
                console.log(err);
            }

            var filePath = path.join(file.url, file.fileName);

            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log(err);
                }

                res.end();
            })
        });
    }
}