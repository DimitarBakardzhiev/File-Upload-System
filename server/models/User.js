module.exports = function (mongoose) {
    var MIN = 6;
    var MAX = 20;

    function length(value) {
        return value.length >= MIN && value.length <= MAX;
    }

    var userSchema = mongoose.Schema({
        username: { type: String, validate: length, required: true, unique: true },
        passwordHash: String,
        salt: String,
        points: Number,
        token: String
    });

    var User = mongoose.model('User', userSchema);
}