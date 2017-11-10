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
    })
    .when('/server', {
        templateUrl : '../html/server.html',
        controller  : 'mainController'
    });
});


app.factory("MyService", function() {
  return {
    data: {}
  };
});

app.controller('mainController', function($scope,$mdDialog,$http,$location,$timeout,MyService) {
    //console.log(MyService.data.username);
    $scope.username = MyService.data.username;
    $scope.password = "";
    $scope.credit = MyService.data.credit;

    $scope.$vm = {
        user:{
            firstName: "",
            lastName: "",
            username: "",
            password: ""
        }
    };

    $scope.loginCheck = function(){
        $http.post("http://localhost:3000/loginCheck", {alias:$scope.username,password:$scope.password}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            if (response.data == ""){
                $scope.error = "Usuario o contraseña incorrecta"; 
            }else{
                $timeout(function () {
                    MyService.data.username = $scope.username;
                    $scope.$apply(function () {
                        $scope.getCredit();
                        $location.path('/menu').replace();
                   });
                }, 0);
            }
        }, function (error) {
            console.log("error");
        });
    }

    $scope.register = function(){
        console.log($scope.$vm.user.firstName);
        $http.post("http://localhost:3000/insertUser", 
            {name:$scope.$vm.user.firstName,
            lastName:$scope.$vm.user.lastName,
            alias:$scope.$vm.user.username,
            password:$scope.$vm.user.password
            },
            {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            if (response.data == ""){
                $scope.error = "transacción incorrecta"; 
            }else{
                $timeout(function () {
                    $scope.$apply(function () {
                        $scope.getCredit();
                        $location.path('/login').replace();
                   });
                }, 0);
            }
        }, function (error) {
            console.log("error");
        });
    }
    
    $scope.getCredit = function(){
        $http.post('http://localhost:3000/getCredit', {alias:$scope.username}).
            then(function(response){
                console.log(response);
                $scope.credit = response.data.mount;
                MyService.data.credit = $scope.credit;
            }, function(error){
                console.log(error)
            });
    }

    $scope.newPass = function(){
        $http.post("http://localhost:3000/newPass", {alias:$scope.username}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            if (response.data == ""){
                $scope.error = "Falló la transacción"; 
            }else{
                alert("transacción correcta");
                $scope.getCredit();
            }
        }, function (error) {
            alert("transacción incorrecta");
            console.log("error");
        });
    }

    $scope.findCredit = function(){
        $http.post("http://localhost:3000/findCredit", {alias:$scope.id}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            if (response.data == 0){
                alert("Saldo insuficiente");
            }else{
                alert("Pasar");
            }
        }, function (error) {
            alert("transacción incorrecta");
            console.log("error");
        });
    }

    $scope.find = function(){
        console.log("entro");
        alert($scope.id);
    }
    /*$http.post("http://localhost:3000/insertCredit", {mount:500,typePayment:1}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            return response;
        });*/
});