//defining the user schema
let mongoose = require('../util/mongo-connection');
let Schema = mongoose.Schema;

const LogSchema = new Schema({
  created_date:{type:Date},
  email: { type: String },
  letterName: { type: String }
});

let Log = mongoose.model('logs', LogSchema);

exports.Log = Log;