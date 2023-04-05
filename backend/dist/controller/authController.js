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
var debug_1 = __importDefault(require("debug"));
var express_1 = require("express");
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var passport_google_oauth2_1 = require("passport-google-oauth2");
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.router = (0, express_1.Router)();
var debugSession = (0, debug_1["default"])('app:session');
var debugPassport = (0, debug_1["default"])('app:passport');
exports.router.use((0, express_session_1["default"])({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    logErrors: true,
    logger: function (msg) { return debugSession(msg); },
    cookie: {
        httpOnly: false,
        secure: false
    }
}));
exports.router.use(passport_1["default"].initialize());
exports.router.use(passport_1["default"].session());
passport_1["default"].serializeUser(function (user, done) {
    done(null, user);
});
passport_1["default"].deserializeUser(function (user, done) {
    done(null, user);
});
/*
  use only FACEBOOK_CALLBACK_URL for all node environment
  but it's value different for each environment in
  the vercel application not in this authController
*/
var facebookCallbackUrl = process.env.FACEBOOK_CALLBACK_URL ||
    'http://localhost:3000/auth/facebook/callback';
var basedUrl = '/api/v1';
if (process.env.USER_BASED_URL) {
    basedUrl = process.env.USER_BASED_URL;
}
// Add a variable to store the authentication provider
var authProvider = '';
// Configure the Facebook authentication strategy
passport_1["default"].use('facebook', new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: facebookCallbackUrl
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));
// Add a handler for user logout
passport_1["default"].use('facebook-logout', new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: facebookCallbackUrl,
    enableProof: true,
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        // Clear the user session and logout the user
        req.logout(function (err) {
            if (err) {
                return done(err);
            }
            return done(null, profile);
        });
    });
}));
// Configure the Google authentication strategy
passport_1["default"].use('google', new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    (function (err, user) {
        return done(err, user);
    });
}));
// Middleware to check if user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User not authenticated' });
};
// Facebook authentication route
exports.router.get('/auth/facebook', passport_1["default"].authenticate('facebook'));
// Facebook authentication callback route
exports.router.get('/auth/facebook/callback', passport_1["default"].authenticate('facebook', {
    successRedirect: "".concat(basedUrl, "/auth/success"),
    failureRedirect: "".concat(basedUrl, "/auth/failure")
}));
// Facebook logout route
exports.router.get('/auth/facebook/logout', function (req, res) {
    // Set the authentication provider
    authProvider = 'facebook';
    // Redirect to the Facebook logout page
    res.redirect("https://www.facebook.com/logout.php?next=".concat(process.env.FACEBOOK_LOGOUT_URL, "&access_token=").concat(req.user.accessToken));
});
// Google authentication route
exports.router.get('/auth/google', passport_1["default"].authenticate('google', {
    scope: ['profile', 'email']
}));
// Google authentication callback route
exports.router.get('/auth/google/callback', passport_1["default"].authenticate('google', {
    successRedirect: "".concat(basedUrl, "/auth/success"),
    failureRedirect: "".concat(basedUrl, "/auth/failure")
}));
// Google logout route
exports.router.get('/auth/google/logout', function (req, res) {
    // Set the authentication provider
    authProvider = 'google';
    // Redirect to the Google logout page
    res.redirect("https://accounts.google.com/o/oauth2/revoke?token=".concat(req.user.accessToken));
});
// Success authentication route
exports.router.get('/auth/success', isAuthenticated, function (req, res) {
    if (authProvider === 'facebook') {
        // Redirect to the Facebook logout page to remove permissions
        res.redirect("https://www.facebook.com/logout.php?next=".concat(process.env.FACEBOOK_LOGOUT_URL, "&access_token=").concat(req.user.accessToken));
    }
    else if (authProvider === 'google') {
        // Redirect to the Google logout page to remove permissions
        res.redirect("https://accounts.google.com/o/oauth2/revoke?token=".concat(req.user.accessToken));
    }
    res.json({ message: 'User authenticated successfully' });
});
// Failure authentication route
exports.router.get('/auth/failure', function (req, res) {
    res.status(401).json({ message: 'User authentication failed' });
});
exports["default"] = exports.router;
