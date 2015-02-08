var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var busboy = require('connect-busboy');

module.exports = function (app, rootDir, express, passport) {
    app.set('view engine', 'jade');
    app.set('views', rootDir + '/server/views');
    app.use(busboy());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(rootDir + '/public'));
}