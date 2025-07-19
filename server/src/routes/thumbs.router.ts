import express from 'express';
import { getAllThumbs } from '../controllers/thumbs.controller'

const thumbsRouter = express.Router();

thumbsRouter.get('/load', async (req, res) => {
    try {
        const thumbsFilenames = await getAllThumbs();
        res.status(200).json(thumbsFilenames);
    } catch (error) {
        res.status(500).json({ error: "Failed at Thumbs router" });
    }
});

export default thumbsRouter;