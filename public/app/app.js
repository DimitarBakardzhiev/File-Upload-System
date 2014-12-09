var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/test', {
        templateUrl: "/app/partials/testTemplate.html"
    });
});