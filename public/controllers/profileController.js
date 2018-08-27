(function () {

    "use strict";

    var App = angular.module("App.profileController", [])

            .controller("profileController", ["$scope", "userService", "$rootScope", function ($scope, userService, $rootScope) {
                    console.log('profileController')
                    $scope.loading = true;
                    $scope.edit = false;
                    $scope.newPasswor = '';
                    
                    $scope.pass = false;
                    $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
                    $scope.cities = ["Sofia", "Plovdiv", "Varna", "Burgas", "Vratza", "Veliko Tarnovo", "Stara Zagora", "Blagoevgrad", "Pernik", "Shumen", "Lovech", "Other"];

                    userService.user(function (user, email) {
                        $scope.$apply(function () {
                            // $rootScope.$emit('user')
                            $scope.user = user;
                            $scope.email = email;


                            if (!$scope.user) {
                                $scope.authorized = false;
                                return;
                            }
                            $scope.authorized = true;
                            $scope.getUserData()





                        })
//                        console.log(user)
//                        console.log(email)
                    })




                    $scope.editUser = function () {

                        $scope.loading = true;


                        firebase.database().ref('/users/' + $scope.me.uid).update({
                            username: $scope.me.username,
                            gender: $scope.me.gender,
                            lookingFor: $scope.me.lookingFor,
                            city: $scope.me.city,
                            country: $scope.me.country,
                            email: $scope.me.email,
                            description: $scope.me.description,
                            phone: $scope.me.phone

                        });


                        firebase.auth().currentUser.updateEmail($scope.me.email)

                        if (pass && $scope.newPassword !== '') {
                            
//                            alert($scope.newPassword)
                            
                            firebase.auth().currentUser.updatePassword($scope.newPassword.toString())
                            
                            $rootScope.$broadcast('passwordChange')
                            return 
                            
                        }
                        $scope.getUserData()



//
//                        firebase.auth()
//                                .signInWithEmailAndPassword($scope.me.email, 'correcthorsebatterystaple')
//                                .then(function (user) {
//                                    user.updateEmail('newyou@domain.com')
//                                })




                    }


                    $scope.getUserData = function () {


                        firebase.database().ref('/users/').once('value').then(function (snapshot) {
                            console.log(snapshot);
                            snapshot.forEach(function (child) {
//                            let user = child.val();
//                            user.uid = child.key;
                                if ($scope.email == child.val().email) {
                                    $scope.me = child.val()
                                    $scope.me.uid = child.key
//                                console.log($scope.me);
//                                console.log(child.key);

                                }
//                            else {
//                                user.averageRating = 0;
//                                user.votes = 0;
//                            }
//                            $scope.hottestProfiles.push(user)
//
//                        })

//                        console.log($scope.hottestProfiles);
                                // $scope.$apply(function () {
                                //     $scope.hottestProfiles.sort((a, b) => a.averageRating.toString().localeCompare(b.averageRating));
                                //
                                // })


//                        console.log($scope.hottestProfiles);
//                        $timeout(function () {
                                $scope.loading = false;
//
                            })
                        });



                    }
                }]);
}());