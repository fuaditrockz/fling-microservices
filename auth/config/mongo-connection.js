const mongoose = require('mongoose');
const keys = require('./keys');

function mongoConnection(env) {
  if (env == 'development') {
    mongoose.connect(keys.dev_uri, { useNewUrlParser: true });
    console.log('MongoDB for Development was connected');
  } else {
    mongose.connect(keys.prod_uri, { useNewUrlParser: true });
    console.log('MongoDB for Production was connected');
  }
}

module.exports = mongoConnection;