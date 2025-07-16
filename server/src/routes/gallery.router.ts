import express from 'express';
import { Request, NextFunction } from 'express';
import { pageParam } from '../types';

const galleryRouter = express.Router();

/**
 * /load enpoint that takes in a page number query param and fetches all the filenames for that page
 */
galleryRouter.get('/load', async (req: Request<pageParam>, res, next: NextFunction) => {
    try {
        const pageParamater = req.query.page;
        const page = typeof pageParamater === 'string' ? parseInt(pageParamater, 10) : 1;
        if (isNaN(page)) {
            return next(new Error("Page must be a string represetning a valid number"));
        }
        //const filenames = await loadThumbs(page);
        res.status(200).json(page);
    } catch (error) {
        next(error);
    };
});

/**
 * Endpoint for fetching indiviual thumb from the server. Takes in a file name and returns that file from the server.
 */
galleryRouter.get('/thumb', async (req, res, next: NextFunction) => {
    try {
        const fileParamater = req.query.filename;
        const filename = typeof fileParamater === 'string';
        //const thumbfile = await getThumb(filename);
        // res.sendFile(thumbFile);
        res.status(200).json({ message: "filesent" });
    } catch (error) {
        next(error);
    };
});

export default galleryRouter;