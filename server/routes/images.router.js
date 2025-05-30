const express = require('express');
const imagesRouter = express.Router();

const { findImagebyId } = require('../models/image.model.js');

imagesRouter.get('/', (req, res) => {
    res.send('images');
});

imagesRouter.get('/:id', async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    if (isNaN(imageId)) {
        return res.status(400).json({ error: "Invalid image ID" });
    }

    try {
        const images = await findImagebyId(imageId);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = imagesRouter;