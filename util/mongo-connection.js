const mongoose = require('mongoose');

let dbconnection = null;

mongoose.initDB = function () {

  let dbURI = 'mongodb://localhost:27017/myDB';

  dbconnection = mongoose.connect(dbURI, { useNewUrlParser: true });
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log("connected ");
    if (!dbconnection) {
      dbconnection = mongoose.createConnection(dbURI);
    }
    console.log('Database -> created for MongoDB host: ');
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('Database -> connection error: ' + err);
    dbconnection = null;
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    mongoose.connection.close();
    console.log('Database -> connection disconnected');
    dbconnection = null;
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Database -> Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

mongoose.getDbConnection = function () {
  return dbconnection;
};

// exports section
module.exports = mongoose;