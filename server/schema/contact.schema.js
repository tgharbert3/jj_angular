const mongoose = require('mongoose');
const { subscribe } = require('../routes/contact.router');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    comments: String,
    subscribe: String,
    anime: Boolean,
    arts: Boolean,
    judo: Boolean,
    lang: Boolean,
    sci: Boolean,
    travel: Boolean,
    hear: String,
})

module.exports = { contactSchema }