const mongoose = require('mongoose');
const { contactSchema } = require('../schema/contact.schema')

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema);

async function insertContact(name, email, comments, subscribe, anime, arts, judo, lang, sci, travel, hear) {
    try {

        const newContact = await contactModel.create({
            name,
            email,
            comments,
            subscribe,
            anime,
            arts,
            judo,
            lang,
            sci,
            travel,
            hear,
        });

        if (newContact) {
            return newContact;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Unable to insert contact", error);
    }
}

module.exports = { insertContact };