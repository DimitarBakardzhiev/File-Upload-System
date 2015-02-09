/**
 * Created by Dimitar on 9.2.2015 г..
 */
app.factory('auth', function($http, $q) {
    var deffered = $q.defer();
    $http.get('/api/users/profile').success(function (data) {
        deffered.resolve(data);
    }).error(function (err) {
        deffered.reject(err);
    });

    return deffered.promise;
});