import express, { NextFunction, Request } from 'express';
import { ContactParam } from '../types';
import { contactController } from '../controllers/contact.controller';

const contactRouter = express.Router();

contactRouter.post('/', async (req: Request<{}, {}, ContactParam>, res, next: NextFunction) => {
    try {
        const contactData = req.body;
        const newContact = await contactController(
            contactData.name,
            contactData.email,
            contactData.comments,
            contactData.subscribe,
            contactData.anime,
            contactData.arts,
            contactData.judo,
            contactData.lang,
            contactData.sci,
            contactData.travel,
            contactData.hear);

        if (newContact) {
            res.status(201).json({ message: "Successfully saved new contact" });
        } else {
            res.status(400).json({ message: "Failed to save contact. Invalid Data" })
        }
        res.status(200).json({ message: "Successfully saved new contact" });
    } catch (error) {
        next(error);
    }
})

export default contactRouter;