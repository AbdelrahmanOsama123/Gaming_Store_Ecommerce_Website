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
var users_1 = require("../conroller/users");
var tokenValidate_1 = __importDefault(require("../Middleware/tokenValidate"));
var isAdmin_1 = __importDefault(require("../Middleware/isAdmin"));
var redis_1 = __importDefault(require("../utalities/redis"));
var users_routes = function (app) {
    app.get('/users/', tokenValidate_1.default, isAdmin_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, users_1.index)()];
                case 1:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(400);
                    res.json("Invalid get data from db " + error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/users/:id', tokenValidate_1.default, isAdmin_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt((req.params.id));
                    return [4 /*yield*/, (0, users_1.show)(id)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(400);
                    res.json("Invalid get data from db " + error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.delete('/users/:id', tokenValidate_1.default, isAdmin_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt((req.params.id));
                    return [4 /*yield*/, (0, users_1.destroy)(id)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(400);
                    res.json("Invalid delete data from db " + error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, resultID, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = {
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: req.body.password,
                        confirm_password: req.body.confirmPassword,
                        isadmin: req.body.isAdmin
                    };
                    resultID = (0, users_1.getUserID)(user.username);
                    console.log(resultID);
                    res.cookie('username', user.username);
                    return [4 /*yield*/, (0, users_1.signUp)(user)];
                case 1:
                    token = _a.sent();
                    res.json(token);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(400);
                    res.json('error => ' + err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/authenticate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    username = req.body.username;
                    password = req.body.password;
                    return [4 /*yield*/, (0, users_1.signIn)(username, password)];
                case 1:
                    response = _a.sent();
                    if ((response === null || response === void 0 ? void 0 : response.accessToken) != null) {
                        res.cookie('username', username);
                        res.json({
                            status: 'success',
                            token: response.accessToken,
                            isadmin: response.isadmin
                        });
                    }
                    else {
                        res.json({
                            status: 'failed',
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(401);
                    res.json('error => ' + error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username;
        return __generator(this, function (_a) {
            try {
                username = req.cookies.username;
                redis_1.default.DEL(username + "A");
                redis_1.default.DEL(username + "R");
                res.clearCookie('jwt', { path: '/' });
                res.json('cleared cookie');
            }
            catch (error) {
                res.status(400);
                res.json('cannot clear the cookie from client side');
            }
            return [2 /*return*/];
        });
    }); });
};
exports.default = users_routes;
