import express, { NextFunction, Request } from 'express';
import { contactParam } from '../types';

const contactRouter = express.Router();

contactRouter.post('/', async (req: Request<{}, {}, contactParam>, res, next: NextFunction) => {
    try {
        const contactData = req.body;
        // const newContact = await contactController();
        // if (newContact) {
        //     res.status(201).json({ message: "Successfully saved new contact" });
        // } else {
        //     res.status(400).json({ message: "Failed to save contact. Invalid Data" })
        // }
        res.status(200).json({ message: "Successfully saved new contact" });
    } catch (error) {
        next(error);
    }


})

export default contactRouter;