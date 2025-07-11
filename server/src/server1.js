const dotenv = require('dotenv');
const http = require('http');

dotenv.config({ path: './.env' });
const app = require('./app');
const PORT = process.env.PORT || 3000;


http.createServer(app).listen(PORT, () => {
    console.log(`Server lisenting on port: ${PORT}`)
})