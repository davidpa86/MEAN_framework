var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var aConfig = require('./frameworkConfig');

var connectWithRetry = function() {
  return mongoose.connect(aConfig.dbConfig.url, function(err) {
    if (err) {
      console.error('Failed to connect to ' + aConfig.dbConfig.url + ' on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }else {
        console.log('Succeeded connected to: ' + aConfig.dbConfig.url);
    }
  });
};
connectWithRetry();

require('./server/authentication/User');
require('./server/authentication/passport');

var PORT = process.env.PORT || aConfig.serverPort;

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/',function(req,res){
  res.sendFile(__dirname + '/server/views/index.html');
});

var routes = require('./server/routes/index')(app,__dirname);

app.listen(PORT, function(){
  console.log('Server running on '+PORT);
});
