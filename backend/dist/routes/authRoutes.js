"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
exports.router = (0, express_1.Router)();
exports.router.use(passport_1["default"].initialize());
exports.router.use(passport_1["default"].session());
passport_1["default"].serializeUser(function (user, done) {
    done(null, user);
});
passport_1["default"].deserializeUser(function (user, done) {
    done(null, user);
});
passport_1["default"].use(new passport_facebook_1.Strategy({
    clientID: 'Client ID',
    clientSecret: 'Client Secret',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));
exports.router.get('/auth/facebook', passport_1["default"].authenticate('facebook'));
exports.router.get('/auth/facebook/callback', passport_1["default"].authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
    console.log('req', req.user);
    res.render('data', {
        user: req.user
    });
});
