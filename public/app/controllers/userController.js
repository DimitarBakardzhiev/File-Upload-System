app.controller('userController', function ($scope, $http, $location) {
    $scope.user = {};
    $scope.error;
    $scope.currentUser = null;
    $scope.login = function (user) {
        $http.post('/api/users/login', JSON.stringify(user)).
            success(function(data, status, headers, config) {
                $scope.currentUser = data.username;
                console.log($scope.currentUser);
                $location.path('/');
            }).
            error(function(data, status, headers, config) {
                $scope.error = angular.fromJson(data);
            });
    }

    $scope.register = function (user) {
        $http.post('/api/users/register', JSON.stringify(user)).
            success(function (data, status, headers, config) {
                $location.path('/login');
            }).
            error(function (data, status, headers, config) {
                $scope.error = angular.fromJson(data);
            });
    }
});