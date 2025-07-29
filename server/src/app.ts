import express from "express";
import helmet from "helmet";
import cors from 'cors';
import path from "path";
import cookieParser from 'cookie-parser';


import imagesRouter from './routes/images.router';
import cartRouter from "./routes/cart.router";
import contactRouter from "./routes/contact.router";
import galleryRouter from "./routes/gallery.router";
import loginRouter from "./routes/login.router";
import logoutRouter from "./routes/logout.router";
import registerRouter from "./routes/register.router";
import thumbsRouter from "./routes/thumbs.router";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

if (!process.env.SESSION_KEY) {
    throw new Error("No session key");
}

if (!process.env.ATLAS_URI_PERSONAL) {
    throw new Error("No atlas Uri");
}

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

app.use(cookieParser());

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

app.use(errorHandler);

export default app;