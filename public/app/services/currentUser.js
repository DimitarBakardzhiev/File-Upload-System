/**
 * Created by Dimitar on 9.2.2015 г..
 */
app.factory('currentUser', function($http, $q) {
    /*var deffered = $q.defer();
    $http.get('/api/users/profile').success(function (data) {
        deffered.resolve(data);
    }).error(function (err) {
        deffered.reject(err);
    });

    return deffered.promise;*/

    function setUser(username) {
        localStorage.setItem('username', username);
    }

    function getUser() {
        return localStorage.username;
    }

    function remove() {
        localStorage.removeItem('username');
    }

    return {
        setUser: setUser,
        getUser:getUser,
        remove: remove
    }
});