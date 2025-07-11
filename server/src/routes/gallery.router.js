const express = require('express');
const galleryRouter = express.Router();
const { loadThumbs, getThumb } = require('../controllers/gallery.controller')

/**
 * /load enpoint that takes in a page number query param and fetches all the filenames for that page
 */
galleryRouter.get('/load', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const filenames = await loadThumbs(page);
        res.status(200).json(filenames);
    } catch (error) {
        console.error("Error in loading thumbs", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to load thumbs" });
        }
    }
});

/**
 * Endpoint for fetching indiviual thumb from the server. Takes in a file name and returns that file from the server.
 */
galleryRouter.get('/thumb', async (req, res) => {
    try {
        const filename = req.query.filename;
        const thumbFile = await getThumb(filename);
        res.sendFile(thumbFile);
    } catch (error) {
        console.error("Error in fetching thumb");
    }
});

module.exports = galleryRouter;