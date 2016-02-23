angular.module('playlistService', [])
    .factory('Playlist', function($http) {
        return {
            // get the most recently played songs
            latest : function() {
                return $http.get('/api/latest');
            }
        }
    });