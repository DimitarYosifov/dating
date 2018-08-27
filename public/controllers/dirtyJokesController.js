(function () {
    "use strict";
    var App = angular.module("App.dirtyJokesController", [])

            .controller("dirtyJokesController", ["$filter", "$timeout", "$scope", "$stateParams", "userService", "$rootScope", "$http", function ($filter, $timeout, $scope, $stateParams, userService, $rootScope, $http) {


                    $scope.loading = true
                    $scope.allJokes = []
                    $scope.page = 1;
                    $scope.maxPages = 1

                    userService.user(function (user) {
                        console.log(user);

                        $scope.$apply(function () {

                            console.log(user);
                            if (user) {
                                $scope.user = user
                            } else {
                                $scope.user = undefined;
                            }

                            // $scope.loading=false

                        })
                        console.log($scope.user)
                    })

                    // ALL JOKES

//                    $scope.changePage = function (index) {
//                        $scope.page = index;
//                    } 

                    $scope.newJoke = '';
                    $scope.registerJoke = function () {

                        console.log($scope.newJoke);
                        firebase.database().ref('/jokes/' + Date.now()).set({
                            content: $scope.newJoke,
                            likes: 0,
                            dislikes: 0
                        }, function (error) {
                            if (error) {
                                // The write failed...
                            } else {
                                // Data saved successfully!
                                $scope.newJoke = '';
                                $scope.allJokes = [];
                                $scope.loading = true;
                                $scope.getAllJokes();

                            }
                        })
                    }

                    $scope.getAllJokes = function () {
                        firebase.database().ref('/jokes/').once('value').then(function (snapshot) {
                            console.log(snapshot);
                            snapshot.forEach(function (child) {
//                                console.log(child.val());
                                let item = child.val()
                                let id = child.key
                                item.id = id;

                                $scope.allJokes.push(item)

                            })
                            console.log($scope.allJokes);
                            $scope.allJokes.reverse()
                            
                            
                            
//                          required to use pagination directive...stupid
                            $scope.profiles=$scope.allJokes
                            
                            
                            
                            
                            // $scope.paginatedJokes = $scope.allJokes
                            $scope.maxPages = Math.ceil($scope.allJokes.length / 5)
                            console.log($scope.maxPages);


                            $timeout(function () {
                                $scope.loading = false;

                            })
                        });
                    }
                    $scope.getAllJokes();



                    // LIKE/DISLIKE
                    $scope.userReaction = function (item, reaction) {
                        console.log($scope.user);
                        if ($scope.user == undefined) {
                            $scope.modalMessage = 'registration required to perform this action'
                            $scope.modal = 'modal';
                        } else if (item.ratedBy && item.ratedBy[$scope.user]) {
                            $scope.modalMessage = 'already reacted to this joke';
                            $scope.modal = 'modal';

                        } else {
                            firebase.database().ref('/jokes/' + item.id).update({
                                [reaction]: item[reaction] + 1
                            });
                            firebase.database().ref('/jokes/' + item.id + '/ratedBy').update({
                                [$scope.user]: true
                            });
                            $scope.allJokes = [];
                            $scope.loading = true;
                            $scope.getAllJokes();
                        }
                    };


                }])
    // .filter('test', function () {
    //     return function (item) {
    //         console.log(item);
    //         return  item[0]
    //     };
    // });
}());