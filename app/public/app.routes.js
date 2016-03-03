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