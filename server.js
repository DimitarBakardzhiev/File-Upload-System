var express = require('express');
var passport = require('passport');
var rootDir = __dirname;

var PORT = 3001;
var app = express();


require('./server/config/express')(app, rootDir, express, passport);
require('./server/config/mongoose')();
require('./server/config/passport')(passport);

var controllers = require('./server/controllers');
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
app.get('*', function (req, res) {
   res.render('index');
});

app.listen(PORT);
console.log('Server running on port ' + PORT);