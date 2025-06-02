/* 
Needs to verify secuirty of requests. 
*/

const { findImagebyId, getImageFromServer } = require('../services/images.service')


const getImage = async (image_id) => {
    if (validateImageId(image_id)) {
        try {
            const imageInfo = await findImagebyId(image_id);
            const filename = imageInfo[0]?.filename;
            const image = await getImageFromServer(filename);
            return image;
        } catch (error) {
            return "Couldnt get info";
        }
    } else {
        return "Failed to get image";
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

module.exports = getImage;