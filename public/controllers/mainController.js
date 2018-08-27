(function () {

    "use strict";

    var App = angular.module("App.mainController", [])

            .controller("mainController", ["$scope", "userService","$timeout", function ($scope, userService,$timeout) {


//                    alert()   
                  
                   
//                        firebase.auth().onAuthStateChanged(function (firebaseUser) {
//                            if (firebaseUser) {
//                                let user = firebaseUser;
//                                console.log(user.uid);
//                                
//                                userService.userTest=user
//                                
//
////                                var userId = firebase.auth().currentUser.uid;
////
////                                firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
////                                    console.log(snapshot);
//////                                
//////                                  userService.user = user;
//////                                userService.userName = snapshot.val().username;
////
////
////                                    console.log(snapshot.val());
//////                                callback(firebaseUser, snapshot.val().username);
////                                });
//                            }
//                        });
//                    
                   




//
//
//
//            firebase.auth().onAuthStateChanged(function (firebaseUser) {
//                console.log(firebaseUser)
//
//                userService.user=firebaseUser
//                // userService.user=1
//                if (firebaseUser) {
//                    console.log(firebaseUser)
//                }
//            })
//
//
//            // var users = firebase.database().ref().child('users');
//            // console.log(users)
//            console.log("ppp")
//
//            // users.once("value", function (snapshot) {
//            //     // console.log(snapshot.child('dimitar').val())
//            //     console.log(snapshot.val())
//            //
//            // })
//
//
//            console.log($stateparams  )

                }]);


}());