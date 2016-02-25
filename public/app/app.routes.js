angular
    .module('app')
    .config(routes);

function routes($routeProvider, $locationProvider) {
    $routeProvider.
    when('/latest', {
        templateUrl: 'app/modules/latest/latest.template.html',
        controller: 'LatestController'
    }).
    otherwise({
        redirectTo: '/latest'
    });

    $locationProvider.html5Mode(true);
}