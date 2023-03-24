"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('response form back');
    next();
});
app.use(process.env.USER_BASED_URL, userRoutes_1.router);
exports.default = app;
//# sourceMappingURL=app.js.map