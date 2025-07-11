const { insertContact } = require('../services/contact.service');

async function contactController(name, email, comments, subscribe, anime, arts, judo, lang, sci, travel, hear) {
    try {
        const newContact = await insertContact(name, email, comments, subscribe, anime, arts, judo, lang, sci, travel, hear);
        if (newContact) {
            return newContact;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in inserting a new contact", error);
        return null
    }
}

module.exports = {
    contactController,
}