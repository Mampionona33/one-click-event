"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var userRoutes_1 = require("./routes/userRoutes");
exports.app = (0, express_1["default"])();
exports.app.get('/', function (req, res, next) {
    res.send('response form back  123');
    next();
});
exports.app.use('/api/v1/users', userRoutes_1.router);
