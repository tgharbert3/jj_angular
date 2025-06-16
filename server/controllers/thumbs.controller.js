const { getAllFilenameFromMongo } = require('../services/thumbs.service');

const getAllThumbs = async () => {
    try {

        const filenmaes = await getAllFilenameFromMongo();
        return filenmaes;
    } catch (error) {
        return "Failed to get thumbs";
    }
}

module.exports = getAllThumbs;