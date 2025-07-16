import express, { Request, NextFunction } from 'express';
import { ImageMetadata, ImageIdRouteParam } from '../types';

const imagesRouter = express.Router();

imagesRouter.get('/metadata', async (req, res, next: NextFunction) => {
    try {
        // const metadata: ImageMetadata  = await getAllImagesMetada();
        // res.status(200).json(metadata);
        res.status(200).json({ message: "Got metadata" });
    } catch (error) {
        next(error);
    }
});

imagesRouter.get('/:id', async (req: Request<ImageIdRouteParam>, res, next: NextFunction) => {
    const imageIdParam = req.params.image_id;

    try {
        const imageId = parseInt(imageIdParam, 10);
        // const image = await getImage(imageId);
        if (!imageId) {
            return res.status(404).json({ error: "Image not found" });
        }
        // res.sendFile(image);
        res.status(200).json({ message: "Got image" });
    } catch (error) {
        next(error);
    }
});


export default imagesRouter;

