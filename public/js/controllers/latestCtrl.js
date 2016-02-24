angular.module('latestCtrl', [])
    .controller('latestController', function($scope, $interval, Latest) {
        $scope.loading = true;
        $scope.currentPeriod = 90;
        $scope.interval = null;
        $scope.periods = [
            {id: 90, name: "90 minutes"},
            {id: 180, name: "3 hours"},
            {id: 300, name: "5 hours"},
            {id: 480, name: "8 hours"}
        ];

        $scope.loadLatestTracks = function() {
            Latest.get($scope.currentPeriod)
                .success(function(data) {
                    $scope.songs = data.response;
                    $scope.loading = false;
                    $interval.cancel($scope.interval);
                    $scope.interval = $interval(function() { $scope.loadLatestTracks($scope.currentPeriod) }, 10000);
                });
        };

        $scope.changePeriod = function() {
            $scope.loading = true;
            $scope.loadLatestTracks();
        };

        $scope.loadLatestTracks();
    });