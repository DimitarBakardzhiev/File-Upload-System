var User = require('mongoose').model('User');
var BearerStrategy = require('passport-http-bearer').Strategy;
var encryption = require('../utilities/encryption');

module.exports = function (passport) {
    passport.use(new BearerStrategy({
        },
        function(token, done) {
            process.nextTick(function () {
                User.findOne({ token: token }, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user);
                })
            });
        }
    ));
}