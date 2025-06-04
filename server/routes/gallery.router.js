const express = require('express');
const galleryRouter = express.Router();
const getFilenamesByPages = require('../controllers/gallery.controller')


galleryRouter.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const thumbFilenames = await getFilenamesByPages(page);
    console.log(thumbFilenames);
    res.json(thumbFilenames);
})

module.exports = galleryRouter;