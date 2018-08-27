(function () {

    "use strict";

    var App = angular.module("App.navbar", []);

    App.directive('navbar', function ($interval, $state, userService, $timeout) {
        return {
            restrict: 'AE',
            // replace: true,
            templateUrl: 'view/navbar.html',
            scope: {
                user: "="

                        //if there were attributes it would be shown here
            },
            link: function ($scope, element, attrs, ctrl) {
                // DOM manipulation may happen here.

                // $scope.$on('user', function () {
                //     console.log()
                //     alert('$on')
                // })

//               userService.user(function (user) {
//                    $scope.user = user;
////                    $scope.currentUserName = username;
//                    
//                    console.log($scope.currentUser);
////                    console.log($scope.currentUserName);
//                    
//                })


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

                userService.user(function (user, email) {
                    $scope.$apply(function () {
                        $scope.user = user
                        console.log(user);
                        console.log(email);
                        // $scope.userIsLogged(user.uid)


//






                        firebase.database().ref('/users/').once('value').then(function (snapshot) {
                            console.log(snapshot);
                            console.log(snapshot.val());

                            snapshot.forEach(function (child) {
                                if (email == child.val().email) {
                                    $scope.username = child.val().username
                                    $scope.img = child.val().profile_picture;
                                    $scope.gender = child.val().gender;
                                }
//                                    console.log(child.key);
                                console.log(child.val().email);
                            });




                        });






                    })
                    console.log(user)
                })




//               (function (user,user2) {
//                    
//                    console.log(user);
//                    console.log(user2);
//                        $scope.currentUser = user;
//                        $scope.currentUserName = user2;
//                        console.log($scope.currentUser);
//                    })


                $interval(function () {
                    $scope.currentTime = moment().format('h:mm:ss');

                }, 1000)
                console.log($scope.currentTime);


                $scope.$on('passwordChange', function () {
                    $scope.signOutUser()
                })


                $scope.signOutUser = function () {

                    // var user = firebase.auth().currentUser;
                    // console.log(user)

                    firebase.auth().signOut().then(function () {
                        console.log('Signed Out');
                        $scope.user = ''
                        $scope.username = ''
                        $scope.img = ''
                        // /   console.log(user)
                        $state.go('home')

                    }, function (error) {
                        console.error('Sign Out Error', error);
                    });

                }


            }
        }
    });


}());