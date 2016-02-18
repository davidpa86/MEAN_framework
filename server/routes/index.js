var jwt = require('express-jwt');
var loginRoutes = require('./login');
var adminRoutes = require('./admin');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function routes(app,dirName) {
    loginRoutes(app,dirName);
    adminRoutes(app,dirName);
};
