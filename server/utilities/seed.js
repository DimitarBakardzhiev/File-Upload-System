var data = require('../data');

module.exports = function () {
    if (data.users.all().then(function (users) {
            if (users.length === 0) {
                data.users.create('peshko', '123456');
                data.users.create('goshko', '123456');
                data.users.create('stamat', '123456');
            }
        }, function (err) {
            console.log(err.message);
        }));
}