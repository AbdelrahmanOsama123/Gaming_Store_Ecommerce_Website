"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartID = exports.create = void 0;
var cart_1 = require("../models/cart");
var store = new cart_1.cartStore();
var create = function (user_id) {
    var result = store.create(user_id);
    return result;
};
exports.create = create;
var getCartID = function (user_id) {
    var cartId = store.getCartID(user_id);
    return cartId;
};
exports.getCartID = getCartID;
