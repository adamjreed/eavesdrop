angular
    .module('app.songs')
    .controller('SongsController', SongsController);

function SongsController($scope, Songs) {
    $scope.loading = true;
    $scope.activeTab = 'songs';
    $scope.currentPeriod = '24 hours';
    $scope.periods = [
        {id: '24 hours', name: "24 hours"},
        {id: '1 week', name: "1 week"},
        {id: '1 month', name: "1 month"},
        {id: '1 year', name: "1 year"}
    ];

    $scope.loadTopSongs = function() {
        Songs.get($scope.currentPeriod)
            .success(function(data) {
                $scope.songs = data.response;
                $scope.loading = false;
            });
    };

    $scope.changePeriod = function() {
        $scope.loading = true;
        $scope.loadTopSongs();
    };

    $scope.loadTopSongs();
};