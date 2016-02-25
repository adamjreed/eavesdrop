angular
    .module('app.latest')
    .factory('Latest', Latest);

function Latest($http) {
    return {
        // get the most recently played songs
        get : function(period) {
            return $http.get('/api/latest?period=' + period);
        }
    }
};