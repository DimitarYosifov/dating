(function () {

    "use strict";

    var App = angular.module("App.loginController", [])

            .controller("loginController", ["$scope", "$state", "$timeout", "userService", "randomImageService", function ($scope, $state, $timeout, userService, randomImageService) {
                    $scope.loginInfo;

                    // $scope.loading = false;
                    // console.log($stateParams)
                    // UtilSrvc.helloWorld()
                    // console.log(userService.user)


                    $timeout(function () {
                        angular.element(document.querySelector('#toggle-login-girl')).click();
                    }, 300)

                    $scope.isClosing = true;
                    $scope.getRandomImage = function () {
                        $scope.isClosing = !$scope.isClosing
                        if ($scope.isClosing) {
                            return;
                        }
                        randomImageService.getImage(function (res) {
                            console.log(res);
                            $scope.randomImage = res
                        })
                    }



//                    $scope.$on('passwordChange', function () {
////                        $scope.signOutUser()
//                        alert()
//                    })



                    $scope.loginUser = function () {
                        const email = $scope.loginEmail;
                        const password = $scope.loginPassword;
                        const auth = firebase.auth();
                        const promise = auth.signInWithEmailAndPassword(email, password);
                        promise
                                .then(
                                        function (res) {

                                            console.log(res)
                                            console.log(res.uid)

                                            if (res.uid) {
                                                $scope.displayLoginMessage("Login successful", 'profile');
                                            }

                                            // $scope.$apply(function () {
                                            // $scope.loading = false;
                                            // $state.go('profile')

                                            // })

                                        }
                                )
                                .catch(function (err) {
                                    console.log(err)
                                    $scope.displayLoginMessage(err.message);


                                })
                    }


                    $scope.displayLoginMessage = function (info, redirect) {
                        $scope.$evalAsync(function () {
                            // $scope.loading = true;
                            $scope.loginInfo = info;
                        });
                        $timeout(function () {
                            $scope.$apply(function () {
                                if (redirect) {
                                    $state.go(redirect)
                                }
                                // $scope.loginInfo = "";

                                // $scope.loading = false;


                            })
                        }, 2000);
                    }


//
// // WRITES IN FIELD USERS!!!
//         function writeUserData(userId, name, email) {
//             firebase.database().ref('users/' + userId).set({
//                 username: name,
//                 email: email,
//                 // profile_picture : imageUrl
//             });
//         }

                }]);


}());