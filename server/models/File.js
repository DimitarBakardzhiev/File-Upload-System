var mongoose = require('mongoose');

module.exports = function () {
    var fileSchema = mongoose.Schema({
        url: String,
        dateOfUploading: Date,
        fileName: String,
        isPrivate: Boolean,
        uploaderId: String
    });

    var File = mongoose.model('File', fileSchema);
}