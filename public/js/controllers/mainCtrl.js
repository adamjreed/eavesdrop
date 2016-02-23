angular.module('mainCtrl', [])
    .controller('mainController', function($scope, $http, Playlist) {
        $scope.loading = true;

        Playlist.latest()
            .success(function(data) {
                $scope.songs = data.response;
                $scope.loading = false;
            });
    });