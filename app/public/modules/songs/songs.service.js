angular
    .module('app.songs')
    .factory('Songs',  ['$http', 'API_URL', Songs]);

function Songs($http, API_URL) {
    return {
        // get the top songs
        get : function(period) {
            return $http.jsonp(API_URL + 'v1/songs?period=' + period + "&callback=JSON_CALLBACK");
        }
    }
};