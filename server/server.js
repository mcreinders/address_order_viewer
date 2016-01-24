/**
 * Created by user on 1/22/16.
 */
var express = require('express');
var app = express();
var index = require('./routes/index');

app.use(express.static('server/public'));

app.use('/', index);

var server = app.listen(3000, function(){
   var port = server.address().port;
    console.log('Listening on port:', port);
});