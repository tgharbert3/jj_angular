"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
// const options = {
//     key: fs.readFileSync('../../.keys/server.key'),
//     cert: fs.readFileSync('../../.keys/server.cert'),
// }
// https.createServer(options, app).listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
// });
app_1.default.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
});
