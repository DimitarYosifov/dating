(function () {

    var App = angular.module('App.userService', [])

            .service('userService', function () {
                // alert()
                var config = {
                    apiKey: 'AIzaSyDYp_KxuwRFcXue0uk3Cz1it5rBr0PlsOA',
                    authDomain: 'meeting-5a6ef.firebaseapp.com',
                    databaseURL: 'meeting-5a6ef.firebaseio.com',
                    storageBucket: 'meeting-5a6ef.appspot.com'
                };
                firebase.initializeApp(config);
                this.userTest = ''
                this.user = function (callback) {
                    firebase.auth().onAuthStateChanged(function (firebaseUser) {
                        if (firebaseUser) {
                            console.log(firebaseUser);
                            console.log(firebaseUser.email);
                            let user = firebaseUser.uid
                            console.log(user);
                            callback(user,firebaseUser.email)




//                            console.log(user.uid);
//                            firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
//                                console.log(snapshot);
//                                console.log(snapshot.val().username);
//                                
//                                callback(firebaseUser, snapshot.val().username)
//                            });
                        }
                    });
                };
                this.selectedProfile = '';

//                this.userName = function (a,callback) {
//                    console.log(a);
//                    console.log(callback);
//                    firebase.database().ref('/users/'+a).once('value').then(function (snapshot) {
//                        console.log(snapshot);
//                        
//
//
//                     
//                    });
//                }

            });
}());