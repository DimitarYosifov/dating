(function () {

    "use strict";

    var App = angular.module("App", [
        // "App.controllers",
        // "App.services",
        // "App.directives",
        // "App.filters",
        "App.userService",
        "App.randomImageService",
        'ui.router',
        "App.mainController",
        "App.homeController",
        "App.loginController",
        "App.registerController",
        "App.profileController",
        "App.allProfilesController",
        "App.innerPersonalProfileController",
        "App.dirtyJokesController",
        "App.statisticsController",
        "App.hottestProfilesController",
        "App.navbar",
        "App.unauthorized",
        "App.pagination",
        "ngSanitize"
                // "ngResource",
    ])

            .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
                // $routeProvider
                $locationProvider.html5Mode(true);
                // npm install --save-dev firebase-server
                // const FirebaseServer = require('firebase-server');
                // new FirebaseServer(5000, 'localhost', {
                //     // states: {
                //     //     CA: 'California',
                //     //     AL: 'Alabama',
                //     //     KY: 'Kentucky'
                //     // }
                // });



                console.log(3333333333);


//                console.log($stateParams);

                // $urlRouterProvider.when("", "view/profile.html");


                let x = window.location.search;
                
                // ?url=dirty-jokes

                console.log(x.substring(5));

                console.log(x);
                
                if(!x){
                    x='home';
                }else{
                   x= x.substring(5);
                }
                
                
                $urlRouterProvider.otherwise(x);
                
                
                
                $stateProvider
                        .state("profile", {
                            url: "/profile",
                            templateUrl: "view/profile.html",
                            controller: 'profileController'
                        })
                        .state("home", {
                            url: "/home",
                            templateUrl: "view/home.html",
                            controller: 'homeController'
                        })
                        .state("login", {
                            url: "/login",
                            templateUrl: "view/login.html",
                            controller: 'loginController'
                        })
                        .state("register", {
                            url: "/register",
                            templateUrl: "view/register.html",
                            controller: 'registerController'
                        })
                        .state("allProfiles", {
                            url: "/profiles",
                            templateUrl: "view/allProfiles.html",
                            controller: 'allProfilesController'
                        })
                        .state("innerPersonalProfile", {
                            url: "/profile/:profileId",
                            templateUrl: "view/innerPersonalProfile.html",
                            controller: 'innerPersonalProfileController'
                        })
                        .state("dirtyJokes", {
                            url: "/dirty-jokes",
                            templateUrl: "view/dirtyJokes.html",
                            controller: 'dirtyJokesController'
                        })
                        .state("hottest", {
                            url: "/hottest",
                            templateUrl: "view/hottestProfiles.html",
                            controller: 'hottestProfilesController'
                        })
                        .state("statistics", {
                            url: "/statistics",
                            templateUrl: "view/statistics.html",
                            controller: 'statisticsController'
                        })
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true
                });




//                $locationProvider.hashPrefix('');


                //
                // var config = {
                //     apiKey: 'AIzaSyDYp_KxuwRFcXue0uk3Cz1it5rBr0PlsOA',
                //     authDomain: 'meeting-5a6ef.firebaseapp.com',
                //     databaseURL: 'meeting-5a6ef.firebaseio.com',
                //     storageBucket: 'meeting-5a6ef.appspot.com'
                // };
                // firebase.initializeApp(config);


                // firebase.auth().onAuthStateChanged(function (firebaseUser) {
                //
                //     // userService.user=1
                //     if (firebaseUser) {
                //
                //         $
                //         var test = firebaseUser
                //
                //         // $stateProvider.state(home)
                //         console.log(firebaseUser)
                //     }
                // })





                // CLEARS LOCALSTORAGE!!!
                // window.onbeforeunload = function () {
                //     localStorage.removeItem("firebase:authUser:AIzaSyDYp_KxuwRFcXue0uk3Cz1it5rBr0PlsOA:[DEFAULT]")
                //     return; // add "" after return for conformation on exit!
                // };
                // console.log(localStorage.getItem('firebase:authUser:AIzaSyDYp_KxuwRFcXue0uk3Cz1it5rBr0PlsOA:[DEFAULT]'));









// CHECKS CURRENT USER---------------------------------------------------------------------
                // var user = firebase.auth().currentUser;
                // console.log(user)


                // var users = firebase.database().ref().child('users');
                // console.log(users)
                //
                // users.once("value", function (snapshot) {
                //     // console.log(snapshot.child('dimitar').val())
                //     console.log(snapshot.val())
                //
                // })
            })
    // .config(['$locationProvider', function ($locationProvider) {
    //     $locationProvider.hashPrefix('');
    // }]);



}());