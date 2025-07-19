import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image_id: Number,
    filename: String,
    caption: String,
    price: Number,
    details: String,
});

export default imageSchema;