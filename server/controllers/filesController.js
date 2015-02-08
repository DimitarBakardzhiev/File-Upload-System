/**
 * Created by Dimitar on 8.2.2015 г..
 */
var File = require('mongoose').model('File');
var busboy = require('connect-busboy');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

module.exports = {
    upload: function (req, res, next) {
        if (!req.user) {
            res.statusCode = 401;
            return res.json();
        }

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            var filePath = config.rootPath + '/files/' + filename
            fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);

                new File({
                    url: filePath,
                    dateOfUploading: new Date(),
                    fileName: filename,
                    isPrivate: false,   // todo
                    uploaderId: req.user._id
                }).save(function (err, file) {
                        if (err) {
                            console.log(err);
                        }

                        res.redirect('/');
                    });
            });
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
        File.findByIdAndUpdate(id, { fileName: req.body.fileName }, function (err, file) {
            if (err) {
                console.log(err);
            }

            return res.end();
        });
    }
}