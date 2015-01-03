app.controller('userController', function ($scope) {
    $scope.user = {};
    $scope.error;
    $scope.login = function (user) {
        $scope.error = "pesho";
        console.log(user.username + ' ' + user.password);
    }
});