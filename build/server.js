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
var app = (0, express_1.default)();
/// Using body parser Middle ware 
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
///Restful user API Routes 
(0, users_1.default)(app);
///Restful orders API Routes 
(0, orders_1.default)(app);
///Restful products API Routes 
(0, products_1.default)(app);
///Restful dashboard API Route
(0, ordersDashboard_1.default)(app);
///user_Register API
///user_login API
app.use('/', register_render_1.default);
app.use('/', login_render_1.default);
app.use('/', home_render_1.default);
app.use('/', shop_render_1.default);
app.use('/', productDetails_render_1.default);
app.use('/', contact_render_1.default);
app.use('/', addProduct_render_1.default);
app.use('/', cart_render_1.default);
var port = 8000;
var host = '127.0.0.1';
app.listen(port, listening);
function listening() {
    console.log("server running on localhost: ".concat(port));
    console.log("Server is running on http://".concat(host, ":").concat(port, "/login"));
}
exports.default = app;
