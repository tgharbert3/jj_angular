const express = require('express');
const thumbsRouter = express.Router();
const getAllThumbs = require('../controllers/thumbs.controller')

thumbsRouter.get('/load', async (req, res) => {
    try {
        const thumbsFilenames = await getAllThumbs();
        res.status(200).json(thumbsFilenames);
    } catch (error) {
        res.status(500).json({ error: "Failed at Thumbs router" });
    }
});

module.exports = thumbsRouter;