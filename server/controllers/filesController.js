/**
 * Created by Dimitar on 8.2.2015 г..
 */
var File = require('mongoose').model('File');
var busboy = require('connect-busboy');
var fs = require('fs');

module.exports = {
    upload: function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('/');
            });
        });
    }
}