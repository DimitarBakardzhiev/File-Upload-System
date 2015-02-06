var controllers = require('../controllers');

module.exports = function (app, passport) {
    app.post('/api/users/register', controllers.usersController.register);
    app.post('/api/users/login', controllers.usersController.login);
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
    app.get('/api/users/profile', controllers.usersController.profile)

    app.get('*', function (req, res) {
        res.render('index', {
            year: new Date().getFullYear(),
            user: req.user !== undefined ? req.user.username : null
        });
    });
}