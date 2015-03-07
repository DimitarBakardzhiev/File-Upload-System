/**
 * Created by Dimitar on 3.3.2015 г..
 */
app.controller('pageController', function ($scope, $rootScope, currentUser) {
    $scope.year = new Date().getFullYear();
    /*currentUser.then(function (user) {
        $rootScope.currentUser = user.username;
        console.log($rootScope.currentUser);
    })*/
    $scope.currentUser = currentUser;
});