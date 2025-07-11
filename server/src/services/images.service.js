const mongoose = require('mongoose');
const { imageSchema } = require('../schema/image.schema')
const path = require('path');

const imageModel = mongoose.models.images || mongoose.model('images', imageSchema);

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
        const image = path.join(__dirname, '..', 'assets', 'images', `${filename}`)
        return image
    } catch (error) {
        return error.message;
    }
}

async function getImagesMetaData() {
    try {
        const metadata = await imageModel.find();
        return metadata;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    findImagebyId,
    getImageFromServer,
    getImagesMetaData,
};