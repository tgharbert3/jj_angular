const mongoose = require('mongoose');
const { thumbsSchema } = require('../schema/thumbs.schema.js');
const path = require('path');

const thumbsModel = mongoose.models.thumbs || mongoose.model('thumbs', thumbsSchema);

async function getAllFilenameFromMongo() {
    try {
        const thumbs = await thumbsModel.find();
        return thumbs
    } catch (error) {
        throw new Error(`Database error from Thumbs: ${error.message}`)
    }
}

async function loadFilenamesFromMongoByPage(page, pageSize) {
    try {
        const thumbs = await thumbsModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        return thumbs;
    } catch (error) {
        throw new Error(`Database error from by page: ${error.message}`)
    }
}

/**
 * Fetches files from server storage
 * @param {object} filenames - array of objects from mongoDb
 * @returns {Array} of thumb files from server
 */
async function getThumbsFromServer(filenames) {
    let thumbsFileList = []
    try {
        filenames.forEach(element => {
            const thumb = path.join(__dirname, '..', 'assets', 'thumbs', `${element.filename}`);
            thumbsFileList.push(thumb);
        });
        return thumbsFileList;
    } catch (error) {
        return error.message;
    }

}

module.exports = { getAllFilenameFromMongo, loadFilenamesFromMongoByPage, getThumbsFromServer };