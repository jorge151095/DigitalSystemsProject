var app = angular.module("Courses", ['ngMaterial','ui.bootstrap','ngAnimate', 'ngSanitize','ngRoute','ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '../html/login.html',
        controller  : 'mainController'
    })
    .when('/login', {
        templateUrl : '../html/login.html',
        controller  : 'mainController'
    })
    .when('/register', {
        templateUrl : '../html/register.html',
        controller  : 'mainController'
    })
    .when('/menu', {
        templateUrl : '../html/menu.html',
        controller  : 'mainController'
    });
});

app.controller('mainController', function($scope,$mdDialog,$http) {
    $scope.username;
    $scope.password;

    $scope.loginCheck = function(){
        $http.post("http://localhost:3000/loginCheck", {alias:$scope.username,password:$scope.password}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            if (response.data == ""){
                $scope.error = "Usuario o contraseña incorrecta"; 
            }else{
                location.href ="#menu";
            }
        });
    }
    /*$http.get('http://localhost:3000/test', {}).
        then(function(response){console.log(response)}, function(error){console.log(error)});*/
    /*$http.post("http://localhost:3000/insertCredit", {mount:500,typePayment:1}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            return response;
        });*/
});