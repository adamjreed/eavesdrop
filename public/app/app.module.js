var app = angular
    .module('app', [
        'app.latest',
        'ngRoute'
    ]);

app.filter('playTime', function playTime($filter){
    return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "h:mma");
    }
});