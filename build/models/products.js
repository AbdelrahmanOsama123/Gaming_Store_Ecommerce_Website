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
exports.productStore = void 0;
var database_1 = __importDefault(require("../utalities/database"));
var productStore = /** @class */ (function () {
    function productStore() {
    }
    productStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'select * from products order by id';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('cannot get products');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO products (name, price,afteroffer,catagory,description,quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [product.name, product.price, product.afteroffer, product.catagory, product.description, product.quantity])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("cannot insert this product : ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM products where id=($1) ';
                        result = conn.query(sql, [id]);
                        conn.release();
                        return [4 /*yield*/, result];
                    case 2: return [2 /*return*/, (_a.sent()).rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("cannot select this product of (".concat(id, ") : ").concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.update = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'UPDATE products SET name = ($1),catagory = ($2),price=($3),afteroffer=($4),description=($5),quantity=($6) WHERE id = ($7) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [product.name, product.catagory, product.price, product.afteroffer, product.description, product.quantity, id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("cannot update this product of (".concat(id, ") : ").concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        conn = database_1.default.connect();
                        sql = "DELETE FROM products WHERE id = ($1) RETURNING *";
                        return [4 /*yield*/, conn];
                    case 1:
                        result = (_a.sent()).query(sql, [id]);
                        return [4 /*yield*/, conn];
                    case 2:
                        (_a.sent()).release();
                        return [4 /*yield*/, result];
                    case 3: return [2 /*return*/, (_a.sent()).rows[0]];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error("cannot delete this product of (".concat(id, ") : ").concat(error_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.getProductsByCatagory = function (catagory) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM products WHERE catagory = ($1)";
                        return [4 /*yield*/, conn.query(sql, [catagory])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("cannot get products ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productStore.prototype.trendingProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * from products LIMIT 4';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_7 = _a.sent();
                        throw new Error('cannot get trending Products');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return productStore;
}());
exports.productStore = productStore;
