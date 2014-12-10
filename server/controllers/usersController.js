var data = require('../Data');

function register(req, res) {
    var newUser = req.body;
    if (newUser.password.length < 6) {
        console.log('invalid password');
    }

    // data.users.create(newUser.username, newUser.password);
}

module.exports = {
    register: register
}