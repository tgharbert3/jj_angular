import express, { Request, NextFunction } from 'express';

const cartRouter = express.Router();

// cartRouter.get('/', (req, res, next: NextFunction) => {
//     const cart = req.session.cart || {};
// })

export default cartRouter;