require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_URI);

const imagesRouter = require('./routes/images.router.js');
const galleryRouter = require('./routes/gallery.router.js');
const registerRouter = require('./routes/register.router.js');
const loginRouter = require('./routes/login.router.js');

app.use(express.json());
// app.enable('trust proxy');
app.use(helmet());
app.use(cors());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/images', imagesRouter);
app.use('/gallery', galleryRouter);

app.use(express.static(path.join(__dirname, '..', 'dist', 'client', 'jj')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'index.html');
    res.sendFile(indexPath);
});

app.use('/images', imagesRouter);
app.use('/gallery', galleryRouter);

app.get('/*splat', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'jj', 'index.html');
    res.sendFile(indexPath);
});

module.exports = app;

