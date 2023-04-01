"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
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
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
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
