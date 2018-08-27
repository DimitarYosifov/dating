(function () {
    "use strict";
    var App = angular.module("App.statisticsController", [])

            .controller("statisticsController", ["$timeout", "$scope", "$stateParams", "userService", "$rootScope", "$http", function ($timeout, $scope, $stateParams, userService, $rootScope, $http) {
                    $scope.loading = true;

                    $scope.byCountry = {}
                    $scope.getAge = function (year) {
                        return moment().format('YYYY') - year;
                    };

//                    $scope.chart = 2;

//                    firebase.database().ref('/users/').once('value').then(function (snapshot) {
//                        snapshot.forEach(function (child) {
//                            let user = child.val();
//                            user.uid = child.key;
//                            user.age = $scope.getAge(child.val().birthDate.year);
//                            $scope.profiles.push(user);
//                        });
////                        console.log($scope.profiles);
//                        console.log($scope.profiles.filter(x => x.gender === 'Male').length);
//                        $scope.displayGenderChart()
//                        $scope.displayCountryChart()
//                        $scope.loading = false;
//                    });


                    $scope.displayCountryChart = function () {
                        $scope.databyCountry = [];
                        $scope.loading = true;

                        firebase.database().ref('/users/').once('value').then(function (snapshot) {
                            snapshot.forEach(function (child) {
                                let country = child.val().country;
                                let type = typeof ($scope.byCountry[country])
                                if (type !== 'number') {
                                    console.log($scope.byCountry);
                                    $scope.byCountry[country] = 1;
                                } else {
                                    $scope.byCountry[country] += 1;
                                }



//                                console.log($scope.byCountry[user.country]);
                            });
                            angular.forEach($scope.byCountry, function (value, key) {
                                $scope.databyCountry.push({country: key, value: value});
                            });


                            $scope.loading = false;


                            $scope.chart = 1;

//                     
                            $scope.countryChart = AmCharts.makeChart("countryChart", {
                                "type": "pie",
                                "theme": "light",
                                "dataProvider": $scope.databyCountry,
                                "valueField": "value",
                                "titleField": "country",
                                "outlineAlpha": 0.4,
                                "depth3D": 15,
                                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                                "angle": 50,
                                "export": {
                                    "enabled": true
                                }
                            });

                        })
                    };




                    $scope.displayGenderChart = function () {
                        $scope.chart = 2;
                        $scope.loading = true;
                        

                        $scope.profiles = [];
                        firebase.database().ref('/users/').once('value').then(function (snapshot) {
                            snapshot.forEach(function (child) {
                                let user = child.val();
                                user.uid = child.key;
                                user.age = $scope.getAge(child.val().birthDate.year);
                                $scope.profiles.push(user);
                            });
                            $scope.loading = false;
                            $scope.genderChart = document.getElementById("genderChart");
                            Chart.defaults.global.defaultFontSize = 18;
                            $scope.males = {
                                label: 'Males',
                                data: [
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 24).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 29 && x.age >= 25).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 34 && x.age >= 30).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 39 && x.age >= 35).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 44 && x.age >= 40).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 49 && x.age >= 45).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 54 && x.age >= 50).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age <= 59 && x.age >= 55).length,
                                    $scope.profiles.filter(x => x.gender === 'Male' && x.age >= 60).length
                                ],
                                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                                borderWidth: 0
                            };
                            $scope.females = {
                                label: 'Females',
                                data: [
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 24).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 29 && x.age >= 25).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 34 && x.age >= 30).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 39 && x.age >= 35).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 44 && x.age >= 40).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 49 && x.age >= 45).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 54 && x.age >= 50).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age <= 59 && x.age >= 55).length,
                                    $scope.profiles.filter(x => x.gender === 'Female' && x.age >= 60).length
                                ],
                                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                                borderWidth: 0
                            };
                            $scope.couples = {
                                label: 'Couples',
                                data: [
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 24).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 29 && x.age >= 25).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 34 && x.age >= 30).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 39 && x.age >= 35).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 44 && x.age >= 40).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 49 && x.age >= 45).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 54 && x.age >= 50).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age <= 59 && x.age >= 55).length,
                                    $scope.profiles.filter(x => x.gender === 'Couple' && x.age >= 60).length
                                ],
                                backgroundColor: 'rgba(91, 211, 230, 0.6)',
                                borderWidth: 0
                            };
                            $scope.data = {
                                labels: ["18-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60+"],
                                datasets: [$scope.males, $scope.females, $scope.couples]
                            };
                            $scope.chartOptions = {
                                scales: {
                                    xAxes: [{
                                            barPercentage: 1,
                                            categoryPercentage: 0.6
                                        }]
                                }
                            };
                            $scope.barChart = new Chart($scope.genderChart, {
                                type: 'bar',
                                data: $scope.data,
                                options: $scope.chartOptions
                            });
                            
                            $scope.genderTableData={
                                males:$scope.profiles.filter(x => x.gender === 'Male').length,
                                females:$scope.profiles.filter(x => x.gender === 'Female').length,
                                couples:$scope.profiles.filter(x => x.gender === 'Couple').length
                            };
                            
                            
                        });
                    };
                    $scope.displayGenderChart();
                }]);

}());