const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const https = require("https");
const fs = require('fs');
const cors = require('cors');

const imagesRouter = require('./routes/images.router.js');
const galleryRouter = require('./routes/gallery.router.js');
const { register } = require('module');

dotenv.config({ path: '../../.env' });
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.enable('trust proxy');

app.use('/register', registerRouter);
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

const options = {
    key: fs.readFileSync('../../.keys/server.key'),
    cert: fs.readFileSync('../../.keys/server.cert'),
}

https.createServer(options, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
