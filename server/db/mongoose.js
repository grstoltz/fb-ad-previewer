const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const config = require('../config/config');

// @@@@@@@@@@@@@ if you use local host @@@@@@@@@@@@@@@@@
const mongooseUrl = 'mongodb://localhost:27017/db';
mongoose.connect(
  mongooseUrl,
  { useNewUrlParser: true },
  console.log(`Connected to mongo @ ${mongooseUrl}`)
);

// @@@@@@@@@@@@@ if you dont use local host @@@@@@@@@@@@@@@@@

// mongoose.connect(mongoUrl, {
//     auth: {
//       user: config.mongoUsername,
//       password: config.mongoPw
//     }
//   })
//   .then(() => console.log('connection successful'))
//   .catch((err) => console.error(err));

// @@@@@@@@@@@@@ if you dont use local host @@@@@@@@@@@@@@@@@

mongoose.Promise = global.Promise;

module.exports = { mongoose, mongooseUrl };
