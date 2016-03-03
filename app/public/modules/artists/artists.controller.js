angular
    .module('app.artists')
    .controller('ArtistsController', ArtistsController);

function ArtistsController($scope) {
    $scope.activeTab = 'artists';
};