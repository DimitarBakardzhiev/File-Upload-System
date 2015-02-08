var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var busboy = require('connect-busboy');

module.exports = function (app, config, express, passport) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(busboy());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
}