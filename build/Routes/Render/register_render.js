"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var userRegister_route = (0, express_1.default)();
userRegister_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd/Register_page"));
userRegister_route.set("view engine", "ejs");
userRegister_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/Register_page")));
userRegister_route.get('/register', function (req, res) {
    try {
        res.render('register');
    }
    catch (error) {
        console.log('cannot get register page ' + error);
    }
});
exports.default = userRegister_route;
