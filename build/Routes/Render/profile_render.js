"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var profile_route = (0, express_1.default)();
profile_route.set("views", path_1.default.join(__dirname, "../../../FrontEnd/"));
profile_route.set("view engine", "ejs");
profile_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../FrontEnd/")));
profile_route.get('/profile', tokenValidate_1.default, function (req, res) {
    try {
        res.render('profile');
    }
    catch (error) {
        console.log('cannot get cart page ' + error);
    }
});
exports.default = profile_route;
