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
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var dotenv_1 = __importDefault(require("dotenv"));
var users_1 = require("../conroller/users");
var users_2 = require("../conroller/users");
dotenv_1.default.config();
passport_1.default.use('google-signup', new passport_google_oauth20_1.Strategy({
    clientID: (process.env.GOOGLE_CLIENT_ID_SIGNUP),
    clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGNUP),
    callbackURL: 'http://localhost:8000/auth/google/signup/callback', // Adjust this to your callback URL for sign-up
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, email, username, password, confirm_password, user, response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                firstname = (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName;
                lastname = (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName;
                email = (profile.emails[0].value);
                username = email.split('@')[0];
                password = username + profile.id;
                confirm_password = username + profile.id;
                user = {
                    email: email,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    confirm_password: confirm_password,
                };
                return [4 /*yield*/, (0, users_1.signUp)(user)];
            case 1:
                response = _c.sent();
                if (response != null) {
                    return [2 /*return*/, done(null, profile, { message: 'hello', username: username })];
                }
                else {
                    return [2 /*return*/, done(null, profile, { message: "error" })];
                }
                return [2 /*return*/];
        }
    });
}); }));
passport_1.default.use('google-signin', new passport_google_oauth20_1.Strategy({
    clientID: (process.env.GOOGLE_CLIENT_ID_SIGNIN),
    clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGNIN),
    callbackURL: 'http://localhost:8000/auth/google/signin/callback', // Adjust this to your callback URL for sign-in
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var email, username, password, User;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = (profile.emails[0].value);
                username = email.split('@')[0];
                password = username + profile.id;
                return [4 /*yield*/, (0, users_2.signIn)(username, password)];
            case 1:
                User = _a.sent();
                console.log(User);
                if (User != null) {
                    return [2 /*return*/, done(null, profile, { message: 'hello', username: username })];
                }
                else {
                    return [2 /*return*/, done(null, profile, { message: 'error' })];
                }
                return [2 /*return*/];
        }
    });
}); }));
// Serialize and deserialize user (this code can be common for both sign-up and sign-in)
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
