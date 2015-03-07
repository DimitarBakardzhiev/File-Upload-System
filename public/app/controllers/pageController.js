/**
 * Created by Dimitar on 3.3.2015 г..
 */
app.controller('pageController', function ($scope, currentUser) {
    $scope.year = new Date().getFullYear();
    $scope.currentUser = currentUser;
});