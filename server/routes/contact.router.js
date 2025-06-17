const express = require('express');
const { contactController } = require('../controllers/contact.controller')

const contactRouter = express.Router();


contactRouter.post('/', async (req, res) => {
    try {
        const {
            name,
            email,
            comments,
            subscribe,
            anime,
            arts,
            judo,
            language: lang,
            sci,
            travel,
            hear,
        } = req.body;

        const newContact = await contactController(name, email, comments, subscribe, anime, arts, judo, lang, sci, travel, hear);
        if (newContact) {
            res.status(201).json({ message: "Successfully saved new contact" });
        } else {
            res.status(400).json({ message: "Failed to save contact. Invalid Data" })
        }
    } catch (error) {
        console.error("Unable to save contact", error);
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = contactRouter