const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const imagesRouter = require('./routes/images.router.js');

dotenv.config({ path: '../../.env' });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist', 'client', 'browser')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'browser', 'index.html');
    res.sendFile(indexPath);
});

app.use('/images', imagesRouter);

app.get('/*splat', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'browser', 'index.html');
    res.sendFile(indexPath);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
