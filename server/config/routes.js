var controllers = require('../controllers');

module.exports = function (app, passport) {
    app.post('/api/users/register', controllers.usersController.register);
    app.post('/api/users/login', controllers.usersController.login);
    app.get('/api/users/logout',
        passport.authenticate('bearer', { session: false }),
        controllers.usersController.logout);
    app.get('/api/users/isAuthenticated',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            res.send(req.user);
        });
    app.get('/api/files/crypto', function (req, res) {
        var encryption = require('../utilities/encryption');
        res.send(encryption.encrypt('pesho'));
    });
    app.get('/api/files/decrypt', function (req ,res) {
        var encryption = require('../utilities/encryption');
        res.send(encryption.decrypt('fb2591d030')); // pesho
    });

    app.get('*', function (req, res) {
        res.render('index');
    });
}