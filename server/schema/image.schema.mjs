import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
    image_id: Number,
    filename: String,
    caption: String,
    price: Number,
    details: String,
})