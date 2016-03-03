var app = angular
    .module('app', [
        'app.constants',
        'app.tabs',
        'app.latest',
        'app.songs',
        'app.artists',
        'ngRoute'
    ]);

/** Filters **/
app.filter('playTime', function playTime($filter){
    return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "h:mma");
    }
});
angular
    .module('app.artists', ['app.tabs']);
angular
    .module('app.latest', ['app.constants', 'app.tabs']);
angular
    .module('app.songs', ['app.tabs']);
angular
    .module('app.tabs', []);
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
    .module('app.tabs')
    .directive('navigationTabs', navigationTabs);

function navigationTabs() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'modules/tabs/tabs.template.html',
        link: function(scope, elem, attrs) {
            jQuery(elem).find('.selectpicker').selectpicker();
        }
    };
};
angular
    .module('app.artists')
    .controller('ArtistsController', ArtistsController);

function ArtistsController($scope) {
    $scope.activeTab = 'artists';
};
angular
    .module('app.latest')
    .controller('LatestController', LatestController);

function LatestController($scope, $interval, Latest) {
    $scope.loading = true;
    $scope.activeTab = 'latest';
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
    $scope.activeTab = 'songs';
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