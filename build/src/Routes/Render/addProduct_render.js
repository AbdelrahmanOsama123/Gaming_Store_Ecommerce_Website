"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var isAdmin_1 = __importDefault(require("../../Middleware/isAdmin"));
var addProductRoute = (0, express_1.default)();
addProductRoute.set("views", path_1.default.join(__dirname, "../../../FrontEnd"));
addProductRoute.set('view engine', 'ejs');
addProductRoute.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/")));
addProductRoute.get('/addProduct', tokenValidate_1.default, isAdmin_1.default, function (req, res) {
    try {
        res.render('addProduct');
    }
    catch (error) {
        console.log('cannot get add Product page ' + error);
    }
});
exports.default = addProductRoute;
