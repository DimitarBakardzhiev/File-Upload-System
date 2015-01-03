app.controller('userController', function ($scope, $http) {
    $scope.user = {};
    $scope.error;
    $scope.login = function (user) {
        console.log(user.username + ' ' + user.password);
        $http.post('/api/users/login', JSON.stringify(user)).
            success(function(data, status, headers, config) {
                console.log(data + ' success');
            }).
            error(function(data, status, headers, config) {
                $scope.error = angular.fromJson(data);
                console.log($scope.error.message + ' error');
            });
    }
});