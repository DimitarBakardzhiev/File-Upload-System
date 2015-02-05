var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: "/app/partials/home.html"
    }).
        when('/test', {
        templateUrl: "/app/partials/testTemplate.html"
    }).
        when('/login', {
            templateUrl: '/app/partials/login.html',
            controller: 'userController'
    })/*.otherwise({
        redirectTo: '/'
    });*/
});