var jwt = require('express-jwt');
var loginRoutes = require('./login');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function routes(app,dirName) {
    loginRoutes(app,dirName);
};
