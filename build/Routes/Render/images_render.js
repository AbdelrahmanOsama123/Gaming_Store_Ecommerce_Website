"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var tokenValidate_1 = __importDefault(require("../../Middleware/tokenValidate"));
var images_route = (0, express_1.default)();
images_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../userImages")));
images_route.get('/showImage/:imagename', tokenValidate_1.default, function (req, res) {
    try {
        var image_name = req.params.imagename;
        res.contentType('image/PNG');
        res.sendFile(path_1.default.join(__dirname, '../../../userImages', image_name));
    }
    catch (error) {
        console.log('cannot get Image  ' + error);
    }
});
images_route.use(express_1.default.static(path_1.default.join(__dirname, "../../../productImages")));
images_route.get('/showProductImage/:imagename', tokenValidate_1.default, function (req, res) {
    try {
        var image_name = req.params.imagename;
        res.contentType('image/PNG');
        res.sendFile(path_1.default.join(__dirname, '../../../productImages', image_name));
    }
    catch (error) {
        console.log('cannot get Image  ' + error);
    }
});
exports.default = images_route;
