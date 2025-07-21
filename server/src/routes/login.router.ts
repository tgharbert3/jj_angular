import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { loginUserController } from '../controllers/login.controller';
import { generateAccessToken } from '../middleware/auth.middleware';

const loginRouter = express.Router();

/**
 * post route from /login validates and sanitizes.
 */
loginRouter.post('/', [
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail()
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage("Password is required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Password must include upper/lowercase, letter, number, and symbols'),

], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await loginUserController(req.body.email, req.body.password);

        if (user) {
            const token = generateAccessToken(user.email);
            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60,
            });
            res.status(200).json({
                firstName: user.firstName,
            });
        } else {
            res.status(401).json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.error('Login Error', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export default loginRouter;