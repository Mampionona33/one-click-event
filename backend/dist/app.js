"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var userRoutes_1 = require("./routes/userRoutes");
var authController_1 = require("./controller/authController");
exports.app = (0, express_1["default"])();
exports.app.use(express_1["default"].json());
exports.app.use(express_1["default"].urlencoded({ extended: true }));
exports.app.use(authController_1.router);
// app.use(morgan('combined'));
var allowlist = [process.env.CLIENT_BASED_URL];
// Middleware Express pour gérer les requêtes
exports.app.use(function (req, res, next) {
    var origin = req.headers.origin;
    if (allowlist.includes(origin)) {
        // Autoriser l'accès à la ressource depuis cette URL
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    else {
        // Bloquer l'accès à la ressource depuis toutes les autres URL
        res.setHeader('Access-Control-Allow-Origin', null);
    }
    // Continuer le traitement de la requête
    next();
});
// Rediriger tout les requete vers /api/v1
exports.app.get('/', function (req, res, next) {
    res.redirect(process.env.USER_BASED_URL);
});
exports.app.get(process.env.USER_BASED_URL, function (req, res, next) {
    res.setHeader('title', 'One click event Api');
    var responsData = {
        message: 'Welcome to one click event api'
    };
    res.json(responsData);
    next();
});
exports.app.use("".concat(process.env.USER_BASED_URL, "/users"), userRoutes_1.router);
if (process.env.NODE_ENV != 'production') {
    console.table([
        ['facebookCallbackUrl', process.env.FACEBOOK_CALLBACK_URL],
        ['process.env.FACEBOOK_APP_ID', process.env.FACEBOOK_APP_ID],
        ['process.env.FACEBOOK_APP_SECRET', process.env.FACEBOOK_APP_SECRET],
        ['process.env.CLIENT_BASED_URL', process.env.CLIENT_BASED_URL],
    ]);
}
