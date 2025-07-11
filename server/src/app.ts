import express from "express";
import helmet from "helmet";
import cors from 'cors';
import path from "path";

import imagesRouter from './routes/images.router';
import cartRouter from "./routes/cart.router";
import contactRouter from "./routes/contact.router";
import galleryRouter from "./routes/gallery.router";
import loginRouter from "./routes/login.router";
import logoutRouter from "./routes/logout.router";
import registerRouter from "./routes/register.router";
import thumbsRouter from "./routes/thumbs.router";

const app = express();


app.use(express.json());
app.use(helmet());
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

app.get('/test1', (req, res) => {
    res.send('test1');
});

export default app;