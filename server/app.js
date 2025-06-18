require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

mongoose.connect(process.env.ATLAS_URI_PERSONAL);

const imagesRouter = require('./routes/images.router.js');
const galleryRouter = require('./routes/gallery.router.js');
const registerRouter = require('./routes/register.router.js');
const loginRouter = require('./routes/login.router.js');
const thumbsRouter = require('./routes/thumbs.router.js');
const logoutRouter = require('./routes/logout.router.js');
const contactRouter = require('./routes/contact.router.js');
const cartRouter = require('./routes/cart.router.js');


app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.ATLAS_URI_PERSONAL,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    }
}
))

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/images', imagesRouter);
app.use('/gallery', galleryRouter);
app.use('/thumbs', thumbsRouter);
app.use('/logout', logoutRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);

app.get('/test', (req, res) => {
    console.log('images router test route hit');
    res.json({ message: 'Images router is working' });
})

app.use(express.static(path.join(__dirname, '..', 'dist', 'client', 'jj')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'index.html');
    res.sendFile(indexPath);
});

app.get('/*splat', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'index.html');
    res.sendFile(indexPath);
});


module.exports = app;

