/* 
Needs to verify secuirty of requests. 
*/

const { findImagebyId, getImageFromServer, getImagesMetaData } = require('../services/images.service')

async function getImage(image_id) {
    if (validateImageId(image_id)) {
        try {
            const imageInfo = await findImagebyId(image_id);
            const filename = imageInfo.filename;
            const image = await getImageFromServer(filename);
            return image;
        } catch (error) {
            return "Couldnt get info";
        }
    } else {
        return "Failed to get image";
    }
}

async function getAllImagesMetadata() {

    try {
        const metadata = await getImagesMetaData();
        return metadata;
    } catch (error) {
        throw new Error("Could not get all images metadata.");
    }
}

function validateImageId(image_id) {
    if (!isNumber(image_id)) {
        return false
    } else {
        return true
    }
}

const isNumber = (num) => {
    if (typeof num == 'number' && Number.isFinite(num)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { getImage, getAllImagesMetadata };