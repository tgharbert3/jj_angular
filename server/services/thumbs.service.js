const mongoose = require('mongoose');
const { thumbsSchema } = require('../schema/thumbs.schema.js');
const conn = require('../config/db_conn.js');

const path = require('path');

const connection = mongoose.createConnection(conn);

async function initConnection() {
    await connection.asPromise();
}
initConnection();

const thumbsModel = connection.model('thumbs', thumbsSchema);

async function getAllFilenameFromMongo() {
    try {
        const thumbs = await thumbsModel.find();
        return thumbs
    } catch (error) {
        throw new Error(`Database error from Thumbs: ${error.message}`)
    }
}

async function getFilenamesFromMongoByPage(page, pageSize) {

    try {
        const thumbs = await thumbsModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        return thumbs;
    } catch (error) {
        throw new Error(`Database error from by page: ${error.message}`)
    }
}

module.exports = { getAllFilenameFromMongo, getFilenamesFromMongoByPage };