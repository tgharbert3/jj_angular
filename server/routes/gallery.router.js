const express = require('express');
const galleryRouter = express.Router();
const { getThumbs } = require('../controllers/gallery.controller')

galleryRouter.get('/load', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const thumbsFiles = await getThumbs(page);
    res.json(Loaded, "True");
})

module.exports = galleryRouter;