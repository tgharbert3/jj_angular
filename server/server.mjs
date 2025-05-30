import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import express from 'express';
import { findImagebyId } from './models/image.model.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get('/test', (req, res) => {
    res.send('test');
})

app.get('/images/:id', async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    if (isNaN(imageId)) {
        return res.status(400).json({ error: "Invalid image ID" });
    }

    try {
        const images = await findImagebyId(imageId);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
