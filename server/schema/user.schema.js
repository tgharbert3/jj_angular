const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    pw: String,
});

module.exports = { userSchema };