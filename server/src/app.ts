import express from "express";
import helmet from "helmet";
import cors from 'cors';
import path from "path";
import { mongoConnect } from './config'

import imagesRouter from './routes/images.router';
import cartRouter from "./routes/cart.router";
import contactRouter from "./routes/contact.router";
import galleryRouter from "./routes/gallery.router";
import loginRouter from "./routes/login.router";
import logoutRouter from "./routes/logout.router";
import registerRouter from "./routes/register.router";
import thumbsRouter from "./routes/thumbs.router";

const app = express();

//Establish connection to mongodb;
mongoConnect();

app.use(express.json());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // required for Angular dev
                "script-src-attr": ["'self'", "'unsafe-inline'"],
                "style-src": ["'self'", "'unsafe-inline'"], // if needed for inline styles
                "default-src": ["'self'"],
                "require-trusted-types-for": ["'script'"],
            },
        },
    })
);
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use('/images', imagesRouter);
app.use('/cart', cartRouter);
app.use('/contact', contactRouter);
app.use('/gallery', galleryRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/thumbs', thumbsRouter);

app.use(express.static(path.join(__dirname, '..', 'dist', 'client', 'jj', 'browser')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'browser', 'index.html');
    res.sendFile(indexPath);
});

app.get('/*splat', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'browser', 'index.html');
    res.sendFile(indexPath);
});

export default app;