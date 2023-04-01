"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var userRoutes_1 = require("./routes/userRoutes");
var authRoutes_1 = require("./routes/authRoutes");
exports.app = (0, express_1["default"])();
exports.app.use((0, express_session_1["default"])({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
exports.app.get('/', function (req, res, next) {
    res.send('response form back 123');
    next();
});
exports.app.use('/api/v1/users', authRoutes_1.router, userRoutes_1.router);
