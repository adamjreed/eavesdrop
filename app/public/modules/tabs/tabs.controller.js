angular
    .module('app.tabs')
    .controller('TabsController', TabsController);

function TabsController($scope, $route) {
    $scope.route = $route;

    $scope.isTabActive = function(tab) {
        return $scope.route.current.activeTab == tab;
    }
};