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

//controller to return addresses by selected user
app.controller('AddressController', ['$scope', '$http', function($scope, $http){
    //get the list of all users
    $http.get('/users').then(function(results){
        $scope.usersList = results.data;
    });

    //takes the id of selected user from html
    $scope.userSelectedAddress = function (selectedUser) {
        var id = selectedUser;
        $http.get('/addresses/' + id).then(function(results){
            $scope.addressList = results.data;
        });
    }
}]);

//controller to return orders
app.controller('OrderByDateController', ['$scope', '$http', function($scope, $http){
    //get the list of all users
    $http.get('/users').then(function(results){
        $scope.usersList = results.data;
    })

    //takes the id of selected user, start and end dates from html
    $scope.userSelectedOrders = function (selectedUser, startDate, endDate) {
        var id = selectedUser;
        var start = startDate;
        var end = endDate;

        $http.get('/orders/' + id +'/' + start + '/' + end).then(function(results){
            //$scope.ordersList = results.data;
            //console.log($scope.ordersList);
        });
    }
}]);


