module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        points: Number
    });

    var User = mongoose.model('User', userSchema);

    User.count({}, function (err, count) {
       if (count === 0)
       {
           var pesho = new User({ username: 'peshko', password: '123456', points: 0 }).save(function (err, user) {
               console.log(user);
           });
       }
    });
}