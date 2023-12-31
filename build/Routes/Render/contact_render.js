"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var contact_route = (0, express_1.default)();
contact_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd/"));
contact_route.set("view engine", "ejs");
contact_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/")));
contact_route.get('/contact', tokenValidate_1.default, function (req, res) {
    try {
        res.render('contact');
    }
    catch (error) {
        console.log('cannot get contact page ' + error);
    }
});
exports.default = contact_route;
