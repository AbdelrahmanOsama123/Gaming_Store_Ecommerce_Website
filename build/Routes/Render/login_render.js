"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var login_route = (0, express_1.default)();
login_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd/Login_page"));
login_route.set("view engine", "ejs");
login_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/Login_page")));
login_route.get('/login', function (req, res) {
    try {
        res.render('login');
    }
    catch (error) {
        console.log('cannot get login page ' + error);
    }
});
exports.default = login_route;
