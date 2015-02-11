var app = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);

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
    }).
        when('/register', {
            templateUrl: '/app/partials/register.html',
            controller: 'userController'
    }).
        when('/upload', {
            templateUrl: '/app/partials/upload.html'
        })
    /*.otherwise({
        redirectTo: '/'
    });*/
});