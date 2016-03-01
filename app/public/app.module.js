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