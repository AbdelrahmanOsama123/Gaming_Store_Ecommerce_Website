"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.saveImage = void 0;
var user_images_1 = require("../../models/dashboard/user_images");
var store = new user_images_1.userImageStore();
var saveImage = function (user_id, imagename) {
    try {
        var result = store.saveImage(user_id, imagename);
        return result;
    }
    catch (error) {
        throw new Error('cannot get image from models ' + error);
    }
};
exports.saveImage = saveImage;
var getImage = function (user_id) {
    try {
        var result = store.getImage(user_id);
        return result;
    }
    catch (error) {
        throw new Error('cannot get image from models ' + error);
    }
};
exports.getImage = getImage;
