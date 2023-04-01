"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var userRoutes_1 = require("./routes/userRoutes");
var authController_1 = require("./controller/authController");
var morgan_1 = __importDefault(require("morgan"));
exports.app = (0, express_1["default"])();
exports.app.use((0, morgan_1["default"])('combined'));
exports.app.use(authController_1.router);
exports.app.get('/', function (req, res, next) {
    res.send('response form back te 123');
    next();
});
exports.app.use('/api/v1/users', userRoutes_1.router);
