import express, { Request, NextFunction } from 'express';
import 'express-session';
const cartRouter = express.Router();

cartRouter.get('/', (req, res, next: NextFunction) => {
    const userCart = req.session.cart || {};
    const user = req.session.user || {};

    const user2 = req.session.user;
})

export default cartRouter;