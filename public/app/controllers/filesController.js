/**
 * Created by Dimitar on 9.2.2015 г..
 */
app.controller('filesController', function ($scope, $http, $upload, $location) {
    $scope.isPrivate = false;

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/api/files/upload',
                    fields: { isPrivate: $scope.isPrivate},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressBarLength = progressPercentage;
                }).success(function (data, status, headers, config) {
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };

    $http.get('/api/files/getAll')
        .success(function(data, status, headers, config) {
            $scope.allFiles = data;
    });
    
    $scope.delete = function (id) {
        var confirmed = window.confirm('Are you sure you want to permanently delete this file?');
        if (confirmed) {
            $http.get('/api/files/delete/' + id)
                .success(function () {
                    $location.url('#/allFiles');
                });
        }
    }
});