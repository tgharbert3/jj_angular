import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import express from 'express';
// import { findImagebyId } from './models/image.model.mjs';
import path from 'path'
import { fileURLToPath } from 'url';
// import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist', 'client', 'browser')))

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'browser', 'index.html');
    res.sendFile(indexPath);
});

// app.get('/images/:id', async (req, res) => {
//     const imageId = parseInt(req.params.id, 10);

//     if (isNaN(imageId)) {
//         return res.status(400).json({ error: "Invalid image ID" });
//     }

//     try {
//         const images = await findImagebyId(imageId);
//         res.json(images);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.get('/*splat', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'client', 'browser', 'index.html');
    res.sendFile(indexPath);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
