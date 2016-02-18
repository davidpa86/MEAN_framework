var config = require('../frameworkConfig');
var mongoose = require('mongoose');
config.dbConfig.models = config.dbConfig.models || [];

for (var i = 0; i < config.dbConfig.models.length; ++i) {
  for (var key in config.dbConfig.models[i]) {
    var schema = new mongoose.Schema(config.dbConfig.models[i][key]);
    if (config.dbConfig.models[i][key].methods){
      schema.methods = config.dbConfig.models[i][key].methods;
    }
    mongoose.model(key, schema);
  }
}
