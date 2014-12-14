var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app, rootDir, express, passport) {
    app.set('view engine', 'jade');
    app.set('views', rootDir + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(express.static(rootDir + '/public'));
}