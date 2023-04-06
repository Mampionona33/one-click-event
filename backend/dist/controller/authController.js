"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth2_1 = require("passport-google-oauth2");
var passportConfig_1 = require("../assets/passportConfig");
var express_1 = require("express");
var express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
exports.router = (0, express_1.Router)();
////////// Initialize session //////////
exports.router.use((0, express_session_1["default"])({
    resave: false,
    saveUninitialized: false,
    logErrors: true,
    cookie: {
        httpOnly: false,
        secure: false
    },
    secret: process.env.SECRET
}));
////////// Initialise passports //////////
exports.router.use(passport_1["default"].initialize());
exports.router.use(passport_1["default"].session());
////////// Google strategy //////////
passport_1["default"].use(new passport_google_oauth2_1.Strategy(passportConfig_1.google, function (request, accessToken, refreshToken, profile, done) {
    // Add your own logic for finding or creating a user
    var user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
    };
    console.log(user);
    // Call done with the user object
    return done(null, user);
}));
// Redirect the user to the Google signin page
exports.router.get('/auth/google', passport_1["default"].authenticate('google', { scope: ['email', 'profile'] }));
// Serialize user into the sessions
passport_1["default"].serializeUser(function (user, done) { return done(null, user); });
// Deserialize user from the sessions
passport_1["default"].deserializeUser(function (user, done) { return done(null, user); });
// On authenticated on Google login page
exports.router.get('/auth/google/callback', passport_1["default"].authenticate('google', {
    failureRedirect: '/auth/google/callback'
}), function (req, res) {
    console.log('Redirection is called');
    // Redirect to the home page of your application
    res.redirect(process.env.API_BASED_URL);
});
// Logout the user
exports.router.get('/logout', function (req, res, next) {
    if (req.user) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
        });
    }
    res.redirect('/');
});
////////// Check Google authentication //////////
// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req);
        return next();
    }
    else {
        return res.redirect('/auth/google');
    }
}
exports.router.use('/', ensureAuthenticated);
