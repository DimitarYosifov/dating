(function () {

    var App = angular.module('App.randomImageService', [])

            .service('randomImageService', function () {
                this.getImage = function (callback) {
                    callback('../images/dancing-girl' + (Math.floor(Math.random() * 14) + 1) + '.gif');
                };
                this.selectedProfile = '';
            });
}());