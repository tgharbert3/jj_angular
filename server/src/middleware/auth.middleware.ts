import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('No access token secret');
}

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET
const TOKEN_EXPIRIATION = '5m';

export function generateAccessToken(userID: string) {
    return jwt.sign({ userID }, JWT_SECRET, { expiresIn: TOKEN_EXPIRIATION })
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken'];
    if (!token) { return res.status(401).json({ message: 'No token Found' }) };

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        (req as any) = payload;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}



