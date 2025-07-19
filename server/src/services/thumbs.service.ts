import mongoose from 'mongoose';
import thumbsSchema from '../schema/thumbs.schema';
import path from 'path';

const thumbsModel = mongoose.models.thumbs || mongoose.model('thumbs', thumbsSchema);

export async function getAllFilenameFromMongo() {
    try {
        const thumbs = await thumbsModel.find();
        const filenames = thumbs.map(thumb => thumb.filename);
        return filenames
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Database error: ${error.message}`);
    }
}

export async function loadFilenamesFromMongoByPage(page: number, pageSize: number) {
    try {
        const thumbs = await thumbsModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        const filenames = thumbs.map(thumb => thumb.filename);
        return filenames;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`mongo error: ${error.message}`);
    }
}

/**
 * Fetches thumb file from server
 * @param {string} filename of file to fetch
 * @returns {file} of thumb file from server
 */
export async function getThumbFromServer(filename: string) {

    try {
        const thumb = path.join(__dirname, '..', 'assets', 'thumbs', `${filename}`);
        return thumb
    }
    catch (error) {
        console.error("Error in loading thumb from server", error);
    }
}