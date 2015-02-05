var controllers = require('../controllers');
var flash = require('connect-flash');

module.exports = function (app, passport) {
    app.post('/api/users/register', controllers.usersController.register);
    app.post('/api/users/login',
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        controllers.usersController.login);
    app.get('/api/users/logout', controllers.usersController.logout);
    app.get('/api/users/isAuthenticated', function (req, res) {
            if (req.user) {
                res.json({
                    message: 'Authenticated!'
                });
            } else {
                res.json({
                    message: 'Unauthenticated!'
                });
            }
        });

    app.get('*', function (req, res) {
        res.render('index', { error: req.flash('error') });
    });
}