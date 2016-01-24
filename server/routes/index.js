/**
 * Created by user on 1/22/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var connectionString = 'postgres://localhost:5432/address_orderviewer';


//get this list of all users
router.get('/users', function(request, response){
   var usersList = [];

   pg.connect(connectionString, function(err, client) {

      var query = client.query("SELECT * FROM users ORDER BY id ASC");

      query.on('row', function(row) {
         usersList.push(row);
      });

      query.on('end', function () {
         client.end();
         return response.json(usersList);
      });
   });
});

//gets addresses for selected user
router.get('/addresses/:id', function(request, response){
   var addressList = [];

   var id = request.params.id;

   pg.connect(connectionString, function(err, client) {

      var query = client.query("SELECT * FROM addresses JOIN users ON users.id = addresses.user_id WHERE users.id = $1", [id]);

      query.on('row', function(row) {
         addressList.push(row);
      });

      query.on('end', function () {
         client.end();
         return response.json(addressList);
      });
   });
});

//gets orders for selected user
router.get('/orders/:id/:start/:end', function(request, response){
    var ordersList = [];

    var id = request.params.id;
    var start = request.params.start;
    var end = request.params.end;

    pg.connect(connectionString, function(err, client) {

        var query = client.query("SELECT * FROM users JOIN orders ON users.id = orders.user_id JOIN addresses ON orders.ship_address_id = addresses.address_id WHERE orders.user_id = $1 AND orders.order_date BETWEEN $2 AND $3", [id, start, end]);

        query.on('row', function(row) {
            ordersList.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(ordersList);
        });
    });
});

//gets the sum of the order amount
router.get('/orderTotal/:id/:start/:end', function(request, response){
    var orderTotal = [];

    var id = request.params.id;
    var start = request.params.start;
    var end = request.params.end;

    pg.connect(connectionString, function(err, client) {

        var query = client.query("SELECT SUM(orders.amount) AS Total_Amt FROM orders JOIN users ON users.id = orders.user_id JOIN addresses ON orders.ship_address_id = addresses.address_id WHERE orders.user_id = $1 AND orders.order_date BETWEEN $2 AND $3", [id, start, end]);

        query.on('row', function(row) {
            orderTotal.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(orderTotal);
        });
    });
});

//route for the index.html file
router.get('/', function(request, response){
   response.sendFile(path.join(__dirname, "../public/views/index.html"));
});


//this keeps the page from getting an error when you refresh
router.get('/*', function(request, response){
   response.redirect('/');
});

module.exports = router;