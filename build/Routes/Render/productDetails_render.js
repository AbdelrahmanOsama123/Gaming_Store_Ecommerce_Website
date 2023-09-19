"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var productDetails_route = (0, express_1.default)();
productDetails_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd"));
productDetails_route.set("view engine", "ejs");
productDetails_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/")));
var name;
var catagory;
var description;
productDetails_route.post('/target', tokenValidate_1.default, function (req, res) {
    name = req.body.name;
    catagory = req.body.catagory;
    description = req.body.description;
    res.json({ name: name, catagory: catagory, description: description });
});
productDetails_route.get('/productDetails', tokenValidate_1.default, function (req, res) {
    try {
        res.render('product-details', { name: name, catagory: catagory, description: description });
    }
    catch (error) {
        console.log('cannot get login page ' + error);
    }
});
exports.default = productDetails_route;
