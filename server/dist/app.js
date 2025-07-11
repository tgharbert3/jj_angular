"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const images_router_1 = __importDefault(require("./routes/images.router"));
const cart_router_1 = __importDefault(require("./routes/cart.router"));
const contact_router_1 = __importDefault(require("./routes/contact.router"));
const gallery_router_1 = __importDefault(require("./routes/gallery.router"));
const login_router_1 = __importDefault(require("./routes/login.router"));
const logout_router_1 = __importDefault(require("./routes/logout.router"));
const register_router_1 = __importDefault(require("./routes/register.router"));
const thumbs_router_1 = __importDefault(require("./routes/thumbs.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http//localhost:4200',
    credentials: true,
}));
app.use('/images', images_router_1.default);
app.use('/cart', cart_router_1.default);
app.use('/contact', contact_router_1.default);
app.use('/gallery', gallery_router_1.default);
app.use('/login', login_router_1.default);
app.use('/logout', logout_router_1.default);
app.use('/register', register_router_1.default);
app.use('thumbs', thumbs_router_1.default);
app.get('/test2', (req, res) => {
    res.send('test2');
});
exports.default = app;
