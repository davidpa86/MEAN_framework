var express = require('express');
const app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var config = require('./frameworkConfig');

var connectWithRetry = () => {
  return mongoose.connect(config.dbConfig.url, (err) => {
    if (err) {
      console.error(`Failed to connect to ${config.dbConfig.url} on startup retrying in 5 sec`, err);
      setTimeout(connectWithRetry, 5000);
    }else {
        console.log(`Succeeded connected to: ${config.dbConfig.url}`);
    }
  });
};
connectWithRetry();

require('./server/authentication/User');
require('./server/authentication/passport');
require('./server/schemaManager.js');

var PORT = process.env.PORT || config.serverPort;

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

var routes = require('./server/routes/index')(app,__dirname);

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`);
});
