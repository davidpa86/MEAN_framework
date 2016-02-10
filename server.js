var express = require('express');
var app = express();
var routes = require('server/routes');

var PORT = process.env.PORT || 3000;

app.all('/*',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, function(){
  console.log('Server running on '+PORT);
});
