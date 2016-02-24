angular.module('latestService', [])
    .factory('Latest', function($http) {
        return {
            // get the most recently played songs
            get : function(period) {
                return $http.get('/api/latest?period=' + period);
            }
        }
    });