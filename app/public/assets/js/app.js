var app = angular
    .module('app', [
        'app.constants',
        'app.tabs',
        'app.latest',
        'app.songs',
        'app.artists',
        'ngRoute'
    ]);

angular
    .module('app.constants', [])
    .constant('API_URL', 'http://api.eavesdrop.dev/');

app.filter('playTime', function playTime($filter){
    return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "h:mma");
    }
});
angular
    .module('app.artists', []);
angular
    .module('app.latest', ['app.constants']);
angular
    .module('app.songs', []);
angular
    .module('app.tabs', []);
angular
    .module('app.artists')
    .controller('ArtistsController', ArtistsController);

function ArtistsController($scope) {

};
angular
    .module('app.latest')
    .controller('LatestController', LatestController);

function LatestController($scope, $interval, Latest) {
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
};
angular
    .module('app.songs')
    .controller('SongsController', SongsController);

function SongsController($scope) {

};
angular
    .module('app.tabs')
    .controller('TabsController', TabsController);

function TabsController($scope, $route) {
    $scope.route = $route;

    $scope.isTabActive = function(tab) {
        return $scope.route.current.activeTab == tab;
    }
};
angular
    .module('app.latest')
    .factory('Latest',  ['$http', 'API_URL', Latest]);

function Latest($http, API_URL) {
    return {
        // get the most recently played songs
        get : function(period) {
            return $http.jsonp(API_URL + 'v1/latest?period=' + period + "&callback=JSON_CALLBACK");
        }
    }
};
angular
    .module('app')
    .config(routes);

function routes($routeProvider, $locationProvider) {
    $routeProvider
        .when('/latest', {
            templateUrl: 'modules/latest/latest.template.html',
            controller: 'LatestController',
            activeTab: 'latest'
        })
        .when('/songs', {
            templateUrl: 'modules/songs/songs.template.html',
            controller: 'SongsController',
            activeTab: 'songs'
        })
        .when('/artists', {
            templateUrl: 'modules/artists/artists.template.html',
            controller: 'ArtistsController',
            activeTab: 'artists'
        })
        .otherwise({
            redirectTo: '/latest'
        });

    $locationProvider.html5Mode(true);
}