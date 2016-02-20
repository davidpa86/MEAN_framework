var config = require('../../frameworkConfig.js');
config.dbConfig.models = config.dbConfig.models || [];
var mongoose = require('mongoose');

module.exports = (app, dirName) => {
  var models = [],
    i;
  for (i = 0; i < config.dbConfig.models.length; ++i) {
    for (var key in config.dbConfig.models[i]) {
      models.push(key);
    }
  }
  app.get('/admin/getModels', (req, res) => {
    res.json(models);
  });

  var _getFn = (modelName) => {
    var sucessFn = (req, res) => {
      var Model = mongoose.model(modelName);
      Model.find({}, (err, results) => {
        res.json(results);
      });
    };
    return sucessFn;
  };

  for (i = 0; i < models.length; ++i) {
    app.get('/admin/' + models[i], _getFn(models[i]));
  }
};
