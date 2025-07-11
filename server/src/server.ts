import config from "./config";
import app from "./app";

// const options = {
//     key: fs.readFileSync('../../.keys/server.key'),
//     cert: fs.readFileSync('../../.keys/server.cert'),
// }

// https.createServer(options, app).listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
// });

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
})
