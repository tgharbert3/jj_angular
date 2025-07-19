import { getAllFilenameFromMongo } from "../services/thumbs.service";

export async function getAllThumbs() {
    try {
        const filenmaes = await getAllFilenameFromMongo();
        return filenmaes;
    } catch (error) {
        return "Failed to get thumbs";
    }
}