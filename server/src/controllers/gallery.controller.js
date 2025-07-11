const { loadFilenamesFromMongoByPage, getThumbFromServer } = require('../services/thumbs.service');


/**
 * Main function for getting thumbs. Takes in a page number, gets the filenames from the db, then gets the files from
 * the server.
 * @param {number} page
 * @returns {Array} of thumbs files 
 */
async function loadThumbs(page) {
    try {
        const filenames = await getFilenamesByPages(page);
        return filenames;
    } catch (error) {
        throw new Error(`Gallery Controller Error at get Thumbs: ${error.message}`);
    }
}

async function getFilenamesByPages(page) {

    try {
        if (page <= 0) {
            throw new Error("Page must be a Postive integer");
        }
        const LIMIT = 6;

        const start = (page - 1) * LIMIT;
        const end = start + LIMIT;

        const thumbs = await loadFilenamesFromMongoByPage(page, LIMIT);
        return thumbs
    } catch (error) {
        throw new Error(`Gallery Controller Error: ${error.message}`);
    }
};


/**
 * Function to get and return file from server
 * @param {string} filename file to be retrieved
 * @returns thumb file from the server
 */
async function getThumb(filename) {
    try {
        const thumbFile = await getThumbFromServer(filename);
        return thumbFile;
    } catch (error) {
        console.error("Error in getThumb", error);
        throw new Error;
    }
}


module.exports = { loadThumbs, getThumb };