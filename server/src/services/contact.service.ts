import mongoose from "mongoose";
import contactSchema from "../schema/contact.schema";

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema);

async function insertContact(name: string,
    email: string,
    comments: string,
    subscribe: boolean,
    anime: boolean,
    arts: boolean,
    judo: boolean,
    lang: boolean,
    sci: boolean,
    travel: boolean,
    hear: string) {
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

export default insertContact;