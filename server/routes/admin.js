var config = require('../../frameworkConfig.js');
config.dbConfig.models = config.dbConfig.models || [];
var mongoose = require('mongoose');

module.exports = function(app, dirName) {
  var models = [],
    i;
  for (i = 0; i < config.dbConfig.models.length; ++i) {
    for (var key in config.dbConfig.models[i]) {
      models.push(key);
    }
  }
  app.get('/admin/getModels', function(req, res) {
    res.json(models);
  });

  function _getFn(modelName) {
    var sucessFn = function(req, res) {
      var Model = mongoose.model(modelName);
      Model.find({}, function(err, results) {
        res.json(results);
      });
    };
    return sucessFn;
  }

  for (i = 0; i < models.length; ++i) {
    app.get('/admin/' + models[i], _getFn(models[i]));
  }
};
