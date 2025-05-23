import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
    image_id: Number,
    fileName: String,
    caption: String,
    price: Number,
    details: String,
})