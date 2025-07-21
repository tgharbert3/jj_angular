import config from "./config";
import app from "./app";
import https from 'https';
import fs from 'fs';
import path from "path";

const options = {
    key: fs.readFileSync(path.join(__dirname, '..', '.keys', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', '.keys', 'server.cert')),
}

https.createServer(options, app).listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
});

// app.listen(config.port, () => {
//     console.log(`Server running on port ${config.port}`);
// })
