var express = require('express');

var PORT = 3001;
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
require('./server/config/mongoose')();

app.get('*', function (req, res) {
   res.render('index');
});

app.listen(PORT);
console.log('Server running on port ' + PORT);