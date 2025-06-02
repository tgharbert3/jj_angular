const getAllFilenameFromMongo = require('../services/thumbs.service');

const getAllThumbs = async () => {
    try {
        const thumbs = await getAllFilenameFromMongo();
        return thumbs;
    } catch (error) {
        return "Failed to get thumbs";
    }
}

module.exports = getAllThumbs;