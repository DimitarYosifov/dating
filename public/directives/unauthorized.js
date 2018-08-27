(function () {
    "use strict";
    var App = angular.module("App.unauthorized", []);
    App.directive('unauthorized', function ($interval) {
        return {
            restrict: 'AE',
            // replace: true,
            templateUrl: 'view/unauthorized.html',
            scope: {
                unauthorized:"="
            },
            link: function ($scope, element, attrs, ctrl) {

            }
        };
    });
}());