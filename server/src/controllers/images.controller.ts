import { findImagebyId, getImagesMetaData, getImageFromServer } from '../services/images.service';
import { validateNumber } from '../middleware/shared';

/**
 * fetches the image
 * @param image_id id of the image to fetch
 * @returns the image file
 */
export async function getImage(image_id: number) {
    if (!validateNumber(image_id)) {
        console.info("Not a valid Image id");
        return null;
    }

    try {
        const imageInfo = await findImagebyId(image_id);
        if (!imageInfo) {
            console.info('No image matching that Id', image_id);
            return null
        }
        const filename = imageInfo.filename;
        const image = await getImageFromServer(filename);
        return image;
    } catch (error) {
        console.error("Failed to get image: ", error);
        throw error;
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
