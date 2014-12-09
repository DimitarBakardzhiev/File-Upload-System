var encryption = require('../utilities/encryption');

module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        username: String,
        passwordHash: String,
        salt: String,
        points: Number
    });

    var User = mongoose.model('User', userSchema);

    //User.count({}, function (err, count) {
    //   if (count === 0)
    //   {
    //       var salt = encryption.generateSalt();
    //       var passwordHash = encryption.generateHashedPassword(this.salt, '123456');
    //       var pesho = new User({
    //           username: 'peshko',
    //           salt: salt,
    //           passwordHash: passwordHash,
    //           points: 0 }).save(function (err, user) {
    //           console.log(user);
    //       });
    //   }
    //});
}