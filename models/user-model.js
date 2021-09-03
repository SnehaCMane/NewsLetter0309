//defining the user schema
let mongoose = require('../util/mongo-connection');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  age: { type: Number }
});

let User = mongoose.model('users', UserSchema);

exports.User = User;