const { getFilenamesFromMongoByPage } = require('../services/thumbs.service');

const getFilenamesByPages = async (page) => {

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
module.exports = getFilenamesByPages;