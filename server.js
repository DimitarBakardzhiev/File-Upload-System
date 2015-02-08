var express = require('express');
var passport = require('passport');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config, express, passport);
require('./server/config/mongoose')(config);
require('./server/config/passport')(passport);
require('./server/config/routes')(app, passport);

app.listen(config.port);
console.log('Server running on port ' + config.port);