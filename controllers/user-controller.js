const User = require('../models/user-model').User;

async function addUser(userDetails) {
    let userObj = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        age: userDetails.age
    }

    let newObj = new User(userObj);
    let result = await newObj.save();
    return result;
}

module.exports.addUser = addUser;