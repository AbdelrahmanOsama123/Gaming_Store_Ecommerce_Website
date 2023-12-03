"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var google_route = (0, express_1.default)();
google_route.get('/auth/google/signup', passport_1.default.authenticate('google-signup', { scope: ['profile', 'email'] }));
google_route.get('/auth/google/signup/callback', passport_1.default.authenticate('google-signup'), function (req, res) {
    try {
        var responseMessage = req.authInfo;
        if (responseMessage.message == 'hello') {
            res.cookie('username', responseMessage.username);
            res.redirect('/home');
        }
        else
            res.redirect('/register');
    }
    catch (err) {
        res.status(400).send('error while signing up user');
    }
});
google_route.get('/auth/google/signin', passport_1.default.authenticate('google-signin', { scope: ['profile', 'email'] }));
google_route.get('/auth/google/signin/callback', passport_1.default.authenticate('google-signin'), function (req, res) {
    var responseMessage = req.authInfo;
    if (responseMessage.message == 'hello') {
        res.cookie('username', responseMessage.username);
        res.redirect('/home');
    }
    else
        res.redirect('/login');
});
exports.default = google_route;
