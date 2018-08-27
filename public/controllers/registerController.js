(function () {

    "use strict";

    var App = angular.module("App.registerController", []);

    App.controller("registerController", ["$scope", "$state", "$timeout", "userService","randomImageService", function ($scope, $state, $timeout, userService,randomImageService) {


        // userService. user=33;// test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(userService.user)

        $timeout(function () {
            angular.element(document.querySelector('#toggle-register-girl')).click();
        },300   )

        $scope.isClosing=true;

        $scope.getRandomImage=function () {
            $scope.isClosing=!$scope.isClosing
            if($scope.isClosing){
                return;
            }
            randomImageService.getImage(function (res) {
                console.log(res);
                $scope.randomImage=res
            })
        }


        $scope.loading = false;
        $scope.encodeImageFileAsURL = function () {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];
                var fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    if (srcData.length > 10485760) {
                        $scope.$apply(function () {
                            $scope.profilePicture.message = "Image appears to be too large!"
                        });
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.profilePicture.message = ""
                    });


                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    document.getElementById("profile-pic").innerHTML = newImage.outerHTML;
                    $scope.file = document.getElementById("profile-pic").innerHTML;
                    console.log($scope.file.length)


                    // console.log("Converted Base64 version is " + document.getElementById("profile-pic").innerHTML);
                };
                fileReader.readAsDataURL(fileToLoad);
            }
        };


        $scope.registerUser = function () {
            console.log($scope.registerEmail);
            // console.log(ee)

            const email = $scope.registerEmail;
            const password = $scope.registerPassword;
            const nickName = $scope.registerNickName;
            const file = $scope.file;
            const registerGender = $scope.registerGender;
            const registerPartnerGender = $scope.registerPartnerGender;
            const country = $scope.country;
            const city = $scope.city;
            const registerAbout = $scope.registerAbout;
            const birthDate ={
                day:$scope.day,
                month:$scope.month,
                year:$scope.year
            };
            const phone = $scope.phone;
            const created = moment().format('MMMM Do YYYY, h:mm:ss');
            const timestamp = Date.now();


            if (password !== $scope.registerConfirmPassword) {
                $scope.displayRegMessage("Passwords do not match!");
                return;
            }

            console.log(email);
            console.log(password);
            console.log(nickName);
            console.log(file);
            console.log(registerGender);
            console.log(registerPartnerGender);
            console.log(country);
            console.log(city);
            console.log(registerAbout);
            console.log(timestamp);


            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise
                .then(
                    function (res) {
                        console.log(res);
                        if (res.uid) {
                            $scope.writeUserData(res.uid, nickName, email, password, file, registerGender, registerPartnerGender, country, city, registerAbout,birthDate,phone,created,timestamp);
                            $scope.displayRegMessage("Registration successful", 'profile');
                        }
                    }
                )
                .catch(function (err) {
                    console.log(err);
                    $scope.displayRegMessage(err.message);
                })
        };



        $scope.writeUserData = function (userId, name, email, password, file, registerGender, registerPartnerGender, country, city, registerAbout,birthDate,phone,created,timestamp) {
            firebase.database().ref('users/' + userId).set({
                username: name,
                email: email,
                password: password,
                profile_picture: file,
                gender: registerGender,
                lookingFor: registerPartnerGender,
                country: country,
                city: city,
                description: registerAbout,
                birthDate:birthDate,
                phone:phone,
                created:created,
                timestamp:timestamp
            });
        };
        $scope.profilePicture = {
            message: '5mb max'
        };





        $scope.regInfo = "";
        $scope.city = "Sofia";
        $scope.country = "Bulgaria";
        $scope.file = "";
        $scope.registerAbout = "";
        $scope.registerGender = "Male";
        $scope.registerPartnerGender = "Female";
        $scope.unavailable = "Unavailable";
        $scope.countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
        $scope.cities = ["Sofia", "Plovdiv", "Varna", "Burgas", "Vratza", "Veliko Tarnovo", "Stara Zagora", "Blagoevgrad", "Pernik", "Shumen", "Lovech", "Other"];
        $scope.year = "1940";
        $scope.month = "1";
        $scope.day = "1";
        $scope.phone = "";
        $scope.timestamp = "";

         // generate years
        (function () {
            $scope.years = ["1940"];
            for (let i = 1941; i < 2019; i++) {
                $scope.years.push(i);
            }
        })();

        // generate months
        (function () {
            $scope.months = ["1"];
            for (let m = 2;m < 13;m++) {
                $scope.months.push(m);
            }
        })();

        // generate days
        (function () {
            $scope.days = ["1"];
            for (let m = 2;m < 32;m++) {
                $scope.days.push(m);
            }
        })();


        $scope.displayRegMessage = function (info, redirect) {
            // $scope.$evalAsync(function () {
                // $scope.loading = true;
                $scope.regInfo = info;
            // });
            $timeout(function () {
                $scope.$apply(function () {
                    // $scope.regInfo = "";


                    if (redirect) {
                        $state.go(redirect)
                    }
                    // $scope.loading = false;

                })
            }, 2000);
        }
    }]);

}());




