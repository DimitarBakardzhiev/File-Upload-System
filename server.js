var express = require('express');
var passport = require('passport');
var rootDir = __dirname;

var PORT = 3001;
var app = express();


require('./server/config/express')(app, rootDir, express, passport);
require('./server/config/mongoose')();
require('./server/config/passport')(passport);

var controllers = require('./server/Controllers');
app.post('/api/register', controllers.usersController.register)

app.get('*', function (req, res) {
   res.render('index');
});

app.listen(PORT);
console.log('Server running on port ' + PORT);