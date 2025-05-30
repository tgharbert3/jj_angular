const mongoose = require('mongoose');
const { imageSchema } = require('../schema/image.schema.js');
const conn = require('../config/db_conn.js');

const connection = mongoose.createConnection(conn);

async function initConnection() {
    await connection.asPromise();
}
initConnection();

const imageModel = connection.model('images', imageSchema);

async function findImagebyId(imageId) {
    try {
        const result = await imageModel.find({ image_id: imageId });
        return result;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

module.exports = {
    findImagebyId,
};
