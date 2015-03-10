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
    app.get('/api/users/profile', controllers.usersController.profile);
    app.post('/api/users/changePassword', controllers.usersController.changePassword);

    app.post('/api/files/upload', controllers.filesController.upload);
    app.get('/api/files/getAll', controllers.filesController.allUserFiles);
    app.get('/api/files/:id', controllers.filesController.download);
    app.get('/api/files/delete/:id', controllers.filesController.delete);

    app.get('*', function (req, res) {
        res.render('index');
    });
}