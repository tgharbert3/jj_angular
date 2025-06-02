const mongoose = require('mongoose');

const thumbsSchema = new mongoose.Schema({
    filename: String,
});

module.exports = { thumbsSchema };