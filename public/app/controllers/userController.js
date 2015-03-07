app.controller('userController', function ($scope, $http, $location, $window, $rootScope, currentUser) {
    $scope.login = function (user) {
        $http.post('/api/users/login', JSON.stringify(user)).
            success(function(data, status, headers, config) {
                //$rootScope.currentUser = angular.copy(data.username);
                currentUser.setUser(data.username);
                $location.path('/');
            }).
            error(function(data, status, headers, config) {
                $rootScope.error = angular.fromJson(data);
            });
    }

    $scope.register = function (user) {
        $http.post('/api/users/register', JSON.stringify(user)).
            success(function (data, status, headers, config) {
                $location.path('/login');
            }).
            error(function (data, status, headers, config) {
                $rootScope.error = angular.fromJson(data);
            });
    }

    $scope.logout = function () {
        $http.get('/api/users/logout').success(function () {
            //$rootScope.currentUser = undefined;
            currentUser.remove();
            $location.path('/');
        }).error(function (err) {
            console.log(err);
        })
    }
});