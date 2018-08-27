(function () {

    "use strict";

    var App = angular.module("App.pagination", []);

    App.directive('pagination', function ($interval) {
        return {
            restrict: 'AE',
            // replace: true,
            templateUrl: 'view/pagination.html',
            scope: {
                page: "=",
                maxPages: "=",
                changePage: '&'
            },
            link: function ($scope, element, attrs, ctrl) {
                $scope.changePage = function (index) {
                    $scope.$parent.page = index;
                };
            }
        };
    });


}());