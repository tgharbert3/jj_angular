const { getFilenamesFromMongoByPage, getThumbsFromServer } = require('../services/thumbs.service');


/**
 * Main function for getting thumbs. Takes in a page number, gets the filenames from the db, then gets the files from
 * the server.
 * @param {number} page
 * @returns {Array} of thumbs files 
 */
async function getThumbs(page) {
    try {
        const filenames = await getFilenamesByPages(page);
        const files = getThumbsFromServer(filenames);
        return files;
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

        const thumbs = await getFilenamesFromMongoByPage(page, LIMIT);
        return thumbs
    } catch (error) {
        throw new Error(`Gallery Controller Error: ${error.message}`);
    }
}
module.exports = { getThumbs };