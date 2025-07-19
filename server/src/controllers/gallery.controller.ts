const { loadFilenamesFromMongoByPage, getThumbFromServer } = require('../services/thumbs.service');


/**
 * Main function for getting thumbs. Takes in a page number, gets the filenames from the db, then gets the files from
 * the server.
 * @param {number} page
 * @returns {Array} of thumbs files 
 */
export async function loadThumbs(page: number) {
    try {
        const filenames = await getFilenamesByPages(page);
        return filenames;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Load thumbs error: ${error.message}`);
    }
}

export async function getFilenamesByPages(page: number) {

    try {
        if (page <= 0) {
            throw new Error("Page must be a Postive integer");
        }
        const LIMIT = 6;

        const thumbs = await loadFilenamesFromMongoByPage(page, LIMIT);
        return thumbs
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Getfilenames error: ${error.message}`);
    }
};


/**
 * Function to get and return file from server
 * @param {string} filename file to be retrieved
 * @returns thumb file from the server
 */
export async function getThumb(filename: string) {
    try {
        const thumbFile = await getThumbFromServer(filename);
        return thumbFile;
    } catch (error) {
        console.error("Error in getThumb", error);
        throw new Error;
    }
}


module.exports = { loadThumbs, getThumb };