(function () {
    "use strict";
    var App = angular.module("App.allProfilesController", [])

            .controller("allProfilesController", ["$scope", "userService", "$rootScope", "$http", "$state", "$timeout", function ($scope, userService, $rootScope, $http, $state, $timeout) {
                    $scope.country = "Bulgaria";
                    $scope.countries = ['Afghanistan', '?land Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
                    $scope.start = "18";
                    $scope.end = "80";
                    $scope.gender = "Female";
                    $scope.partnerGender = "Male";
                    $scope.minAge = ["18"];
                    $scope.maxAge = ["18"];
                    $scope.page = 1;
                    $scope.maxPages = 1;
                    $scope.loading=true;


//                    $scope.changePage = function (index) {
//                        $scope.page = index;
//                    };


                    userService.user(function (user) {
                        $scope.$apply(function () {
                            $scope.user = user

                        })
                        console.log(user)
                    })

                    $scope.profile = userService.selectedProfile


                    $timeout(function () {

                        if (!$scope.user) {
                            $scope.authorized = false;
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
                    $scope.loading=false;

                    })





                    function b() {
                        for (let i = 19; i < 81; i++) {
                            $scope.minAge.push(i);
                        }
                    }
                    function a() {
                        for (let j = 19; j < 81; j++) {
                            $scope.maxAge.push(j);
                        }
                    }
                    ;

                    a()
                    b()

                    $scope.search = function () {
                        $scope.loading = true;


                        console.log($scope.gender);
                        console.log($scope.partnerGender);
                        console.log($scope.start);
                        console.log($scope.end);
                        console.log($scope.country);


                        firebase.database().ref('/users/').once('value').then(function (snapshot) {
                            $scope.profiles = [];
                            snapshot.forEach(function (child) {
                                let user = child.val()
                                user.uid = child.key
                                console.log(user);
                                $scope.profiles.push(user)
                            });

                            $scope.profiles = $scope.profiles.filter(x => x.country === $scope.country);
                            $scope.profiles = $scope.profiles.filter(x => $scope.getAge(x.birthDate.year) >= $scope.start);
                            $scope.profiles = $scope.profiles.filter(x => $scope.getAge(x.birthDate.year) <= $scope.end);

                            $scope.profiles = $scope.profiles.filter(x => $scope.gender === x.lookingFor);


//alert($scope.partnerGender)
//alert($scope.gender)

                            if ($scope.partnerGender !== "Doesn't Matter") {
                                $scope.profiles = $scope.profiles.filter(x => $scope.partnerGender === x.gender);
                            }




                            console.log($scope.profiles);
                            $scope.maxPages = Math.ceil($scope.profiles.length / 10);
                            $scope.loading = false;
                        });


                    }
                    // firebase.database().ref('/users/').once('value').then(function (snapshot) {
                    //     $scope.profiles = [];
                    //     snapshot.forEach(function (child) {
                    //         $scope.profiles.push(child.val())
                    //     });
                    //     console.log($scope.profiles);
                    //     $scope.loading = false;
                    // });


                    $scope.getAge = function (year) {
                        return moment().format('YYYY') - year;
                    };

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

                    $scope.profileSelected = function (profile) {
                        userService.selectedProfile = profile;
                        $state.go('innerPersonalProfile', {profileId: profile.uid})
                        console.log(userService.selectedProfile);
                    }

                }]);
}());