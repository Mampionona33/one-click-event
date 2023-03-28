"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('response form back  123');
    next();
});
app.use('/api/v1/users', userRoutes_1.router);
exports.default = app;
