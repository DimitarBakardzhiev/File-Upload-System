var User = require('mongoose').model('User');
var LocalStrategy = require('passport-local').Strategy;
var encryption = require('../utilities/encryption');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            process.nextTick(function () {
                User.findOne({ username: username }, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    var passwordHash = encryption.generateHashedPassword(user.salt, password);
                    if (user.passwordHash !== passwordHash) { return done(null, false); }
                    return done(null, user);
                })
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}