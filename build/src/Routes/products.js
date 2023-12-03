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
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var products_1 = require("../conroller/products");
var tokenValidate_1 = __importDefault(require("../Middleware/tokenValidate"));
var uploadedFilename = '';
var productId;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, next) {
        next(null, 'productImages/'); // Specify the folder where you want to save the files
    },
    filename: function (req, file, next) {
        // Generate a unique filename for the uploaded file (you can modify this logic)
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        uploadedFilename = file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname);
        next(null, uploadedFilename);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
var products_routes = function (app) {
    app.post('/products', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    product = {
                        name: req.body.name,
                        price: req.body.price,
                        afteroffer: req.body.afteroffer,
                        catagory: req.body.catagory,
                        description: req.body.description,
                        quantity: req.body.quantity,
                        image: req.body.image
                    };
                    return [4 /*yield*/, (0, products_1.create)(product)];
                case 1:
                    result = _a.sent();
                    productId = result.id;
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(400);
                    res.json({ status: 'failed' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/saveProductImage', upload.single('image'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var savedImage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, products_1.saveProductImage)(uploadedFilename, productId)];
                case 1:
                    savedImage = _a.sent();
                    res.json(savedImage);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(400);
                    res.send('cannot insert data to database ' + error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/getImage', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user_id, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_id = req.cookies.user_id;
                    return [4 /*yield*/, (0, products_1.getImage)(user_id)];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(400);
                    res.send('cannot get Image from database ' + error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, products_1.index)()];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(400);
                    res.json("Invalid get all data from database " + error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/getMostPlayed', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, products_1.getMostPlayed)()];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(400);
                    res.json("Invalid get all data from database " + error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/products/:id', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, (0, products_1.show)(id)];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(400);
                    res.json("Invalid show data from database " + error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    ///tokenValidate
    app.put('/products/:id', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product, id, result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    product = {
                        name: req.body.name,
                        price: req.body.price,
                        catagory: req.body.catagory,
                        afteroffer: req.body.afteroffer,
                        description: req.body.description,
                        quantity: req.body.quantity,
                        image: req.body.image
                    };
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, (0, products_1.update)(id, product)];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    res.status(400);
                    res.json("Invalid update data from database " + error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    ///tokenValidate
    app.delete('/products/:id', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, (0, products_1.Delete)(id)];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    res.status(400);
                    res.json("Invalid delete data from database " + error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/products/catagory/:category', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var catagory, result, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    catagory = req.params.category;
                    return [4 /*yield*/, (0, products_1.getProductsByCatagory)(catagory)];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    res.status(400);
                    res.json("Invalid get products by required catagory from database " + error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/trending', tokenValidate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, products_1.getTrendingProducts)()];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    res.status(400);
                    res.json("Invalid get trending products " + error_10);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/getProductId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var productName, product_id, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    productName = req.body.productName;
                    return [4 /*yield*/, (0, products_1.getProductId)(productName)];
                case 1:
                    product_id = _a.sent();
                    res.json(product_id);
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    res.status(400);
                    res.json("cannot get product_id from product model " + error_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/limit4', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var offset, products, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    offset = req.body.offset;
                    return [4 /*yield*/, (0, products_1.getPageProducts)(offset)];
                case 1:
                    products = _a.sent();
                    res.json(products);
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _a.sent();
                    res.status(400);
                    res.json("cannot get products with offset from product models " + error_12);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.default = products_routes;
