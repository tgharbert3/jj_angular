const dotenv = require('dotenv');
const https = require("https");
const http = require('http');
const fs = require('fs');

// const options = {
//     key: fs.readFileSync('../../.keys/server.key'),
//     cert: fs.readFileSync('../../.keys/server.cert'),
// }

dotenv.config({ path: './.env' });
const app = require('./app');
const PORT = process.env.PORT || 3000;

// https.createServer(options, app).listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
// });

http.createServer(app).listen(PORT, () => {
    console.log(`Server lisenting on port: ${PORT}`)
})