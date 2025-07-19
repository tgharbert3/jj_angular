import { findImagebyId, getImagesMetaData, getImageFromServer } from '../services/images.service';

/**
 * fetches the image
 * @param image_id id of the image to fetch
 * @returns the image file
 */
export async function getImage(image_id: number) {
    if (!validateImageId) {
        throw new Error("Invalid image id");
    }

    try {
        const imageInfo = await findImagebyId(image_id);
        const filename = imageInfo.filename;
        const image = await getImageFromServer(filename);
        return image;
    } catch (error) {
        throw new Error(`Invalid image id: ${error} `);
    }
};

/**
 * gets all the images metadata
 * @returns all the images metadata
 */
export async function getAllImagesMetadata() {
    try {
        const metadata = await getImagesMetaData();
        return metadata;
    } catch (error) {
        throw new Error(`Could not get all images metadata: ${error}`);
    }
}

/**
 * validates that the image id is a number
 * @param image_id the image id to fetch
 * @returns boolean based on if it is a valid number
 */
function validateImageId(image_id: number) {
    return typeof image_id === 'number' && Number.isFinite(image_id);
}
