"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var users_1 = __importDefault(require("./Routes/users"));
var orders_1 = __importDefault(require("./Routes/orders"));
var products_1 = __importDefault(require("./Routes/products"));
var ordersDashboard_1 = __importDefault(require("./Routes/dashboard/ordersDashboard"));
var login_render_1 = __importDefault(require("./Routes/Render/login_render"));
var register_render_1 = __importDefault(require("./Routes/Render/register_render"));
var home_render_1 = __importDefault(require("./Routes/Render/home_render"));
var shop_render_1 = __importDefault(require("./Routes/Render/shop_render"));
var productDetails_render_1 = __importDefault(require("./Routes/Render/productDetails_render"));
var contact_render_1 = __importDefault(require("./Routes/Render/contact_render"));
var addProduct_render_1 = __importDefault(require("./Routes/Render/addProduct_render"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cart_render_1 = __importDefault(require("./Routes/Render/cart_render"));
var cart_1 = __importDefault(require("./Routes/cart"));
var cartItems_1 = __importDefault(require("./Routes/cartItems"));
var orderItems_1 = __importDefault(require("./Routes/orderItems"));
var profile_render_1 = __importDefault(require("./Routes/Render/profile_render"));
var sendMail_1 = __importDefault(require("./Routes/sendMail"));
var welcomeMail_1 = __importDefault(require("./Routes/welcomeMail"));
var orderEmail_1 = __importDefault(require("./Routes/orderEmail"));
var user_images_1 = __importDefault(require("./Routes/dashboard/user_images"));
var images_render_1 = __importDefault(require("./Routes/Render/images_render"));
var passport_1 = __importDefault(require("passport"));
var google_1 = __importDefault(require("./Routes/google"));
var express_session_1 = __importDefault(require("express-session"));
require("./utalities/google");
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
}));
/// Using body parser Middle ware 
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// Initialize Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, users_1.default)(app);
(0, orders_1.default)(app);
(0, products_1.default)(app);
(0, ordersDashboard_1.default)(app);
(0, cart_1.default)(app);
(0, cartItems_1.default)(app);
(0, orderItems_1.default)(app);
(0, sendMail_1.default)(app);
(0, welcomeMail_1.default)(app);
(0, orderEmail_1.default)(app);
(0, user_images_1.default)(app);
app.use('/', register_render_1.default);
app.use('/', login_render_1.default);
app.use('/', home_render_1.default);
app.use('/', shop_render_1.default);
app.use('/', productDetails_render_1.default);
app.use('/', contact_render_1.default);
app.use('/', addProduct_render_1.default);
app.use('/', cart_render_1.default);
app.use('/', profile_render_1.default);
app.use('/', images_render_1.default);
app.use('/', google_1.default);
var port = 8000;
var host = '127.0.0.1';
app.listen(port, listening);
function listening() {
    console.log("server running on localhost: ".concat(port));
    console.log("Server is running on http://".concat(host, ":").concat(port, "/login"));
}
exports.default = app;
