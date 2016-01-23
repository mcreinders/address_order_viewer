/**
 * Created by user on 1/22/16.
 */
var app = angular.module('routeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/address', {
            templateUrl: 'views/address.html',
            controller: 'AddressController'
        })

        .when('/orderByDate', {
            templateUrl: 'views/orderByDate.html',
            controller: 'OrderByDateController'
        })

//this keeps the page from getting an error when you refresh
    $locationProvider.html5Mode(true);

}]);

app.controller('AddressController', ['$scope', '$http', function($scope, $http){
    //get the list of all users
    $http.get('/users').then(function(results){
        $scope.usersList = results.data;
    });

    //var selectedUser = $('')

    $scope.userSelected = function () {
        var id = $(".dropdown").data();
        console.log(id);
    }
}]);

app.controller('OrderByDateController', ['$scope', '$http', function($scope, $http){
    //get the list of all users
    $http.get('/users').then(function(results){
        $scope.usersList = results.data;
    })

    $scope.userSelected = function () {
        console.log("button clicked");
    }
}]);


