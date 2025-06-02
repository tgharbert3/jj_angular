const mongoose = require('mongoose');
const { imageSchema } = require('../schema/image.schema.js');
const conn = require('../config/db_conn.js');

const path = require('path');

const connection = mongoose.createConnection(conn);

async function initConnection() {
    await connection.asPromise();
}
initConnection();

const imageModel = connection.model('images', imageSchema);

//TODO: function should return one image. It is currenly returning an array of objects.
async function findImagebyId(imageId) {
    try {
        const result = await imageModel.findOne({ image_id: imageId });
        return result;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

function getImageFromServer(filename) {

    try {
        console.log(filename + " From service")
        const image = path.join(__dirname, '..', 'assets', 'images', `${filename}`)
        return image
    } catch (error) {
        return error.message;
    }

}

module.exports = {
    findImagebyId,
    getImageFromServer
};