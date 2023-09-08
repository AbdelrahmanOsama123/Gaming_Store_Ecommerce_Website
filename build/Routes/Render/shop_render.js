"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var shop_route = (0, express_1.default)();
shop_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd/"));
shop_route.set("view engine", "ejs");
shop_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/")));
shop_route.get('/shop', tokenValidate_1.default, function (req, res) {
    try {
        res.render('shop');
    }
    catch (error) {
        console.log('cannot get login page ' + error);
    }
});
exports.default = shop_route;
