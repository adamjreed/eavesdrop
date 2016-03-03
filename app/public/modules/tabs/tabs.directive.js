angular
    .module('app.tabs')
    .directive('navigationTabs', navigationTabs);

function navigationTabs() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'modules/tabs/tabs.template.html',
        link: function(scope, elem, attrs) {
            jQuery(elem).find('.selectpicker').selectpicker();
        }
    };
};