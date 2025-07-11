const mongoose = require('mongoose');
const { thumbsSchema } = require('../schema/thumbs.schema.js');
const path = require('path');

const thumbsModel = mongoose.models.thumbs || mongoose.model('thumbs', thumbsSchema);

async function getAllFilenameFromMongo() {
    try {
        const thumbs = await thumbsModel.find();
        const filenames = thumbs.map(thumb => thumb.filename);
        return filenames
    } catch (error) {
        throw new Error(`Database error from Thumbs: ${error.message}`)
    }
}

async function loadFilenamesFromMongoByPage(page, pageSize) {
    try {
        const thumbs = await thumbsModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        const filenames = thumbs.map(thumb => thumb.filename);
        return filenames;
    } catch (error) {
        throw new Error(`Database error from by page: ${error.message}`)
    }
}

/**
 * Fetches thumb file from server
 * @param {string} filename of file to fetch
 * @returns {file} of thumb file from server
 */
async function getThumbFromServer(filename) {

    try {
        const thumb = path.join(__dirname, '..', 'assets', 'thumbs', `${filename}`);
        return thumb
    }
    catch (error) {
        console.error("Error in loading thumb from server", error);
    }

}

module.exports = { getAllFilenameFromMongo, loadFilenamesFromMongoByPage, getThumbFromServer };