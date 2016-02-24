var playlistApp = angular.module('playlistApp', ['latestCtrl', 'latestService']);

playlistApp.filter('playTime', function playTime($filter){
    return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "h:mma");
    }
});