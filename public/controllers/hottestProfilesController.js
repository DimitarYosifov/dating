//hottestProfiles
(function () {

    "use strict";

    var App = angular.module("App.hottestProfilesController", [])

            .controller("hottestProfilesController", ["$scope", "userService", "$timeout", "$state", function ($scope, userService, $timeout, $state) {
                    $scope.loading = true;
                    $scope.profiles = [];
                    $scope.page = 1;
                    $scope.maxPages = 1;
                    $scope.orderedBy = '-averageRating';
                    $scope.sort = function (sortBy) {
                        if ($scope.orderedBy.replace(/[^a-zA-Z]+/g, '') !== sortBy) {
                            $scope.orderedBy = sortBy === 'averageRating' ? '-' + sortBy : sortBy;
                            return;
                        }
                        $scope.orderedBy[0] === '-' ? $scope.orderedBy = sortBy : $scope.orderedBy = '-' + sortBy;
                    };

                    userService.user(function (user) {
                        $scope.$apply(function () {
                            $scope.user = user;
//                            $scope.loading = false

                        })
                        console.log(user)
                    })

                    $timeout(function () {

                        if (!$scope.user) {
                            $scope.authorized = false;
                            return;
                        }
                        $scope.authorized = true;


                    });

                    $scope.getAge = function (year) {

                        return moment().format('YYYY') - year;
                    };
                    $scope.profileSelected = function (profile) {
                        userService.selectedProfile = profile;
                        $state.go('innerPersonalProfile', {profileId: profile.uid});
                        console.log(userService.selectedProfile);
                    };
//                    $scope.changePage = function (index) {
//                        $scope.page = index;
//                    };

                    firebase.database().ref('/users/').once('value').then(function (snapshot) {
//                        $scope.profiles = [];     
                        snapshot.forEach(function (child) {
                            let user = child.val();
                            user.uid = child.key;
                            user.age = $scope.getAge(child.val().birthDate.year);
                            console.log(user);
                            $scope.profiles.push(user);

                            if (user.rating) {
                                user.votes = Object.values(user.rating).length;
                                user.averageRating = Object.values(user.rating).reduce((prev, curr) => prev + curr) / user.votes;
                            } else {
                                user.averageRating = 0;
                                user.votes = 0;
                            }
                        });
                        $scope.maxPages = Math.ceil($scope.profiles.length / 10);
                        console.log($scope.maxPages);
                        console.log($scope.profiles);
                        $scope.loading = false;
                    });


//                    $scope.orderedBy = '-averageRating'



                }])
            .filter('filtedByUserSearch', function () {
                return function (data, input, length) {
                    if (!input) {
                        return data;
                    }
                    let filtered = data.filter(x => x.username.includes(input));
//                    console.log(data);
//                    if(length){
//                        return filtered.length;
//                    }
                    return filtered;
                };
            });


}());