(function () {
    "use strict";
    var App = angular.module("App.innerPersonalProfileController", [])

            .controller("innerPersonalProfileController", ["$timeout", "$scope", "$stateParams", "userService", "$rootScope", "$http", function ($timeout, $scope, $stateParams, userService, $rootScope, $http) {


                    $scope.loading = true


                     console.log($stateParams.user);


                    userService.user(function (user) {
                        $scope.$apply(function () {
                            $scope.user = user
                            // $scope.loading=false

                        })
                        console.log(user)
                    })

                    $scope.profile = userService.selectedProfile
                    // $scope.authorized=null;

                    $timeout(function () {

                        if (!$scope.user) {
                            $scope.authorized = false;
                            $scope.loading = false

                            return;
                        }
                        $scope.authorized = true;
                        console.log($scope.user.uid)
                        console.log($scope.profile.uid)
                        // console.log(Object.keys($scope.profile.rating).indexOf($scope.user.uid))

                        $scope.visitingOwnProfile = $scope.user.uid === $scope.profile.uid
                        if ($scope.profile.rating) {
                            $scope.alreadyRated = Object.keys($scope.profile.rating).indexOf($scope.user.uid) === -1 ? false : true

                        } else {
                            $scope.alreadyRated = false
                        }
                        $scope.loading = false
                    })


                    $scope.starSrc = [
                        "../images/rating-empty.png",
                        "../images/rating-empty.png",
                        "../images/rating-empty.png",
                        "../images/rating-empty.png",
                        "../images/rating-empty.png",
                    ]

                    console.log(userService.selectedProfile);

                    $scope.getImage = function (img, gender) {
                        if (img) {
                            return img;
                        } else if (gender === 'Male') {
                            return '<img src="/images/no-image-male.gif">'
                        } else if (gender === 'Female') {
                            return '<img src="/images/no-image-female.jpg">'
                        } else {
                            return '<img src="/images/couple.png">'
                        }
                    };

                    $scope.rateHover = function (hoveredStar) {
                        for (let i = 0; i <= 4; i++) {
                            $scope.starSrc[i] = "../images/rating-empty.png"
                        }

                        for (let j = 0; j <= hoveredStar; j++) {
                            $scope.starSrc[j] = "../images/rating-full.png"
                        }
                    }

                    $scope.clearStars = function () {
                        for (let i = 0; i <= 4; i++) {
                            $scope.starSrc[i] = "../images/rating-empty.png"
                        }
                    }

                    $scope.rateComplete = function (valuation) {
                        // console.log($scope.profile);
                        $scope.loading = true

                        console.log($scope.user.uid);
                        // let user = $scope.user.uid
                        firebase.database().ref('/users/' + $scope.profile.uid + /rating/).update({
                            [$scope.user.uid]: valuation
                        });


                        //GET PROFILE INFO
                        firebase.database().ref('/users/' + $scope.profile.uid).once('value').then(function (snapshot) {
                            $scope.profile.rating = snapshot.val().rating
                            console.log(snapshot.val());
                            if ($scope.profile.rating) {
                                $scope.profile.votes = Object.values($scope.profile.rating).length;
                                $scope.profile.averageRating = Object.values($scope.profile.rating).reduce((prev, curr) => prev + curr) / $scope.profile.votes



                            }
                            $scope.alreadyRated = true;
                            console.log($scope.profile);
                            // snapshot.forEach(function (child) {
                            //     console.log(child.val());
                            // })
                            $scope.loading = false;

                        });
                    }

                }]);
}());