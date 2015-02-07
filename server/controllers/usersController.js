var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');
var passport = require('passport');

module.exports = {
    register: function (req, res) {
        if (req.body.username.length > 20 || req.body.username.length < 6) {
            res.statusCode = 400;
            return res.json({
                message: 'The username must be between 6 and 20 characters!'
            });
        }

        if (req.body.password.length < 5) {
            res.statusCode = 400;
            return res.json({
                message: 'The password must be at least 6 characters!'
            });
        }

        if (req.body.password !== req.body.confirmPassword) {
            res.statusCode = 400;
            return res.json({
                message: "The given password and confirmed password don't match!"
            });
        }

        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
            } else if (user !== null) {
                res.statusCode = 400;
                return res.json({
                    message: 'A user with the same username already exists!'
                });
            }
        });

        var salt = encryption.generateSalt();
        var hashedPassword = encryption.generateHashedPassword(salt, req.body.password);
        new User({
            username: req.body.username,
            salt: salt,
            passwordHash: hashedPassword,
            points: 0
        }).save(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    res.statusCode = 201;
                    res.end();
                }
            });
    },
    
    login: function (req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                console.log(err)
                return next(err);
            }

            if (!user) {
                res.statusCode = 400;
                return res.json({ message: 'Wrong username or password!' });
            }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json({
                    username: req.user.username
                });
            });
        })(req, res, next);
    },
    
    logout: function (req, res) {
        req.logout();
        res.end();
    },
    
    profile: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        res.json({
            username: req.user.username,
            points: req.user.points
        });
    },
    
    changePassword: function (req, res) {
        if (!req.user) {
            res.statusCode = 401;
            return res.end();
        }

        if (req.body.password.length < 5) {
            res.statusCode = 400;
            return res.json({
                message: 'The password must be at least 6 characters!'
            });
        }

        if (req.body.password !== req.body.confirmPassword) {
            res.statusCode = 400;
            return res.json({
                message: "The given password and confirmed password don't match!"
            });
        }

        var passwordHash = encryption.generateHashedPassword(req.user.salt, req.body.password);
        User.findByIdAndUpdate(req.user._id, { passwordHash: passwordHash }, function (err, user) {
            if (err) {
                console.log(err);
            }

            res.end();
        });
    }
}