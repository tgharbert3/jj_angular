const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image_id: Number,
    filename: String,
    caption: String,
    price: Number,
    details: String,
});

module.exports = { imageSchema };