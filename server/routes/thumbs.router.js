const express = require('express');
const thumbsRouter = express.Router();
const getAllThumbs = require('../controllers/thumbs.controller')

thumbsRouter.get('/load', async (req, res) => {
    try {
        await getAllThumbs();
        res.json({ loaded: "Loaded" });
    } catch (error) {
        res.status(500).json({ error: "Failed at Thumbs router" });
    }
});

module.exports = thumbsRouter;