"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemStore = void 0;
var database_1 = __importDefault(require("../utalities/database"));
var cartItemStore = /** @class */ (function () {
    function cartItemStore() {
    }
    cartItemStore.prototype.create = function (cartItem) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql1, result1, quantity, sql2, result2, sql3, result3, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql1 = 'SELECT * FROM cart_items where cart_id=($1) and product_id=($2)';
                        return [4 /*yield*/, conn.query(sql1, [cartItem.cart_id, cartItem.product_id])];
                    case 2:
                        result1 = _a.sent();
                        if (!result1.rows.length) return [3 /*break*/, 4];
                        quantity = result1.rows[0].quantity;
                        sql2 = 'Update cart_items set quantity = ($1) where cart_id = ($2) and product_id=($3) RETURNING *';
                        return [4 /*yield*/, conn.query(sql2, [cartItem.quantity + quantity, cartItem.cart_id, cartItem.product_id])];
                    case 3:
                        result2 = _a.sent();
                        conn.release();
                        return [2 /*return*/, result2.rows[0]];
                    case 4:
                        sql3 = 'Insert into cart_items(cart_id,product_id,quantity) values($1,$2,$3) RETURNING *';
                        return [4 /*yield*/, conn.query(sql3, [cartItem.cart_id, cartItem.product_id, cartItem.quantity])];
                    case 5:
                        result3 = _a.sent();
                        return [2 /*return*/, result3.rows[0]];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        throw new Error('cannot Insert data into cartItem table');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    cartItemStore.prototype.getCartItems = function (cart_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT cart_items.cart_id,products.name,products.catagory, products.price, products.afteroffer,cart_items.quantity,products.id FROM cart_items inner join products ON cart_items.product_id=products.id WHERE cart_items.cart_id=($1)';
                        return [4 /*yield*/, conn.query(sql, [cart_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error('cannot get cartItems from cartItem table');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    cartItemStore.prototype.deleteCartItems = function (cart_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'delete from cart_items where cart_id = ($1) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [cart_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error('cannot delete all cartItems into cartItem table');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    cartItemStore.prototype.deleteCartItem = function (cart_id, product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'delete from cart_items where cart_id = ($1) and product_id = ($2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [cart_id, product_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error('cannot delete cartItem from cartItem table');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    cartItemStore.prototype.updateCartItem = function (quantity, cart_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'update cart_items set quantity =($1) where cart_id=($2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [quantity, cart_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error('cannot delete cartItem from cartItem table');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return cartItemStore;
}());
exports.cartItemStore = cartItemStore;
