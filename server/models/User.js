module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        username: { type: String, required: true, unique: true },
        passwordHash: String,
        salt: String,
        points: Number
    });

    var User = mongoose.model('User', userSchema);
}