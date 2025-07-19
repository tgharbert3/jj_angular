import insertContact from '../services/contact.service';

export async function contactController(
    name: string,
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
};