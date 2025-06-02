const express = require('express');
const imagesRouter = express.Router();

const getImage = require('../controllers/images.controller.js');

imagesRouter.get('/:id', async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    try {
        const image = await getImage(imageId);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.sendFile(image);
    } catch (error) {
        res.status(500).json({ error: "Failed at Router" });
    }
})

module.exports = imagesRouter;