const express = require('express');
const thumbsRouter = express.Router();
const getAllThumbs = require('../controllers/thumbs.controller')

thumbsRouter.get('/', async (req, res) => {
    try {
        const thumbs = await getAllThumbs();
        res.send({ "Thumbs": thumbs });
    } catch (error) {
        res.status(500).json({ error: "Failed at Thumbs router" });
    }
});

module.exports = thumbsRouter;