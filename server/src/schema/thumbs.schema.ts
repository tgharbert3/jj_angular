import mongoose from "mongoose";

const thumbsSchema = new mongoose.Schema({
    filename: String,
});

export default thumbsSchema;