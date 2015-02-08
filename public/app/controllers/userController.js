app.controller('userController', function ($scope, $http, $location, $window) {
    $scope.error;

    $scope.login = function (user) {
        $http.post('/api/users/login', JSON.stringify(user)).
            success(function(data, status, headers, config) {
                $location.path('/');
                $window.location.reload();
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

    $scope.logout = function () {
        $http.get('/api/users/logout').
            success(function (data, status, headers, config) {
                $location.path('/');
                $window.location.reload();
            });
    }
});