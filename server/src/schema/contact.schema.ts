import mongoose from "mongoose";

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

export default contactSchema