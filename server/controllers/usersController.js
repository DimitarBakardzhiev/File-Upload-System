var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    register: function (req, res) {
        if (req.body.username.length > 20 || req.body.username.length < 6) {
            res.statusCode = 400;
            return res.json({
                message: 'The username must be between 6 and 20 characters!'
            });
        } else {
            var salt = encryption.generateSalt();
            var hashedPassword = encryption.generateHashedPassword(salt, req.body.password);
            new User({
                username: req.body.username,
                salt: salt,
                passwordHash: hashedPassword
            }).save(function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(user);
                        res.statusCode = 201;
                        res.end();
                    }
                });
        }
    },
    login: function (req, res) {
        res.redirect('/');
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
}