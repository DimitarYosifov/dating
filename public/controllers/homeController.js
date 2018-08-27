(function () {

    "use strict";

    var App = angular.module("App.homeController", [])

            .controller("homeController", ["$scope", "userService", "$rootScope", "$http", "$state", "$timeout", function ($scope, userService, $rootScope, $http, $state, $timeout) {
                    console.log('wwww')


                    $scope.loading = true;
                    $scope.latestProfiles = []
                    $scope.hottestProfiles = []
                    $scope.maxRating = 5

                    userService.user(function (user) {
                        $scope.$apply(function () {
                            $scope.user = user
                            console.log(user);
                            // $scope.userIsLogged(user.uid)

                        })
                        console.log(user)
                    })

//                    $scope.currentUser = userService.user;
//                    console.log( $scope.currentUser);
//                    $scope.currentUserName = userService.userName;
                    ;

                    // GETS CURRENT USER UID!!!
//                    userService.user(function (user) {
//                        $scope.currentUser = user;
//                        console.log($scope.currentUser);
//                    })

                    // CHECK IF THERE IS PROFILE PICTURE
                    $scope.getImage = function (img, gender) {
                        if (img) {
                            return img;
                        } else if (gender === 'Male') {
                            return '<img src="/images/no-image-male.gif">';
                        } else if (gender === 'Female') {
                            return '<img src="/images/no-image-female.jpg">';
                        } else {
                            return '<img src="/images/couple.png">';
                        }
                    };

                    $scope.getAge = function (year) {
                        return moment().format('YYYY') - year;
                    };


                    $scope.profileSelected = function (profile) {
                        userService.selectedProfile = profile;
                        $state.go('innerPersonalProfile', {profileId: profile.uid})
                        console.log(userService.selectedProfile);
                    }

                    // GETS LAST 5 USERS
                    firebase.database().ref('/users/').orderByChild('timestamp').limitToLast(5).once('value').then(function (snapshot) {
                        console.log(snapshot);
                        snapshot.forEach(function (child) {
                            let user = child.val()
                            user.uid = child.key
                            if (user.rating) {
                                user.votes = Object.values(user.rating).length;
                                user.averageRating = Object.values(user.rating).reduce((prev, curr) => prev + curr) / user.votes
                            }
                            $scope.latestProfiles.push(user)
                        })
                        $scope.latestProfiles.reverse()
                        // $scope.loading = false;
                    });

                    firebase.database().ref('/users/').once('value').then(function (snapshot) {
                        console.log(snapshot);
                        snapshot.forEach(function (child) {
                            let user = child.val()
                            user.uid = child.key
                            if (user.rating) {
                                user.votes = Object.values(user.rating).length;
                                user.averageRating = Object.values(user.rating).reduce((prev, curr) => prev + curr) / user.votes
                            } else {
                                user.averageRating = 0;
                                user.votes = 0;
                            }
                            $scope.hottestProfiles.push(user)

                        })

                        console.log($scope.hottestProfiles);
                        // $scope.$apply(function () {
                        //     $scope.hottestProfiles.sort((a, b) => a.averageRating.toString().localeCompare(b.averageRating));
                        //
                        // })


                        console.log($scope.hottestProfiles);
                        $timeout(function () {
                            $scope.loading = false;

                        })
                    });


                    console.log($scope.hottestProfiles);

                }]);


}());