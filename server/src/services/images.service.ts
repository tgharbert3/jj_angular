import mongoose from "mongoose";
import imageSchema from '../schema/image.schema';
import path from "path";

const imageModel = mongoose.models.images || mongoose.model('images', imageSchema);

/**
 * service function that queries the mongoDO to find one image by id
 * @param imageId: number, image id for the image to find
 * @returns image 
 */
export async function findImagebyId(imageId: number) {

    try {
        const result = await imageModel.findOne({ image_id: imageId });
        return result;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Database error: ${error.message}`);
    }
};

/**
 * function to query mongo for the images metadata
 * @returns all of the images metadata from mongo db
 */
export async function getImagesMetaData() {
    try {
        const metadata = await imageModel.find();
        return metadata;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Database error: ${error.message}`);
    }
};

/**
 * retirves the file that is stored on the server
 * @param filename string of he specific filename to retrieve
 * @returns the full file 
 */
export function getImageFromServer(filename: string) {
    try {
        const image = path.join(__dirname, '..', 'assets', 'images', `${filename}`)
        return image
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Server error: ${error.message}`);
    }
};