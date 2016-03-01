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