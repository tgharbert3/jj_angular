import express from 'express';
import { Request, NextFunction } from 'express';
import { PageParam } from '../types';
import { loadThumbs, getThumb } from '../controllers/gallery.controller';

const galleryRouter = express.Router();

/**
 * /load enpoint that takes in a page number query param and fetches all the filenames for that page
 */
galleryRouter.get('/load', async (req: Request<PageParam>, res, next: NextFunction) => {
    try {
        const pageParamater = req.query.page;
        const page = typeof pageParamater === 'string' ? parseInt(pageParamater, 10) : 1;
        if (isNaN(page)) {
            return next(new Error("Page must be a string represetning a valid number"));
        }
        const filenames = await loadThumbs(page);
        res.status(200).json(filenames);
    } catch (error) {
        next(error);
    };
});

/**
 * Endpoint for fetching indiviual thumb from the server. Takes in a file name and returns that file from the server.
 */
galleryRouter.get('/thumb', async (req, res, next: NextFunction) => {
    const fileParamater = req.query.filename;
    if (!(typeof fileParamater === 'string')) {
        return res.status(400).json({ error: "Invalid filename" });
    }


    try {
        const thumbfile = await getThumb(fileParamater);
        if (!thumbfile) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.sendFile(thumbfile);
    } catch (error) {
        next(error);
    };
});

export default galleryRouter;