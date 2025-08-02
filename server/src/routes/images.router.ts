import express, { Request, NextFunction } from 'express';
import { ImageIdRouteParam } from '../types';
import { getImage, getAllImagesMetadata } from '../controllers/images.controller';

const imagesRouter = express.Router();

/**
 * Route that fetches all the images metadata
 */
imagesRouter.get('/metadata', async (req, res, next: NextFunction) => {
    try {
        const metadata = await getAllImagesMetadata();
        if (!metadata) {
            return res.status(404).json({ message: "No metadata available" });
        }
        res.status(200).json(metadata);
    } catch (error) {
        next(error);
    }
});

/**
 * Route that receives an imageId param
 */
imagesRouter.get('/:id', async (req: Request<ImageIdRouteParam>, res, next: NextFunction) => {
    const imageIdParam = req.params.id;
    const imageId = parseInt(imageIdParam, 10);
    if (isNaN(imageId)) {
        return res.status(400).json({ error: "Invalid image ID" });
    };
    try {
        const imagepath = await getImage(imageId);
        if (!imagepath) {
            return res.status(404).json({ error: "Image not found" });
        };
        res.sendFile(imagepath);
    } catch (error) {
        next(error);
    };
});

export default imagesRouter;

