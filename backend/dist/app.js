"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var userRoutes_1 = require("./routes/userRoutes");
var cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1["default"])();
// app.use(morgan('combined'));
var allowlist = [process.env.CLIENT_BASED_URL];
// const corsOptionsDelegate = (req: Request, callback: Function) => {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
// app.use(cors(corsOptionsDelegate));
exports.app.use((0, cors_1["default"])({
    origin: 'http://localhost:19006'
}));
// app.use(authController);
exports.app.get('/', function (req, res, next) {
    res.redirect(process.env.USER_BASED_URL);
});
exports.app.get(process.env.USER_BASED_URL, function (req, res, next) {
    res.send('Welcome to one click event api');
    next();
});
exports.app.use("".concat(process.env.USER_BASED_URL, "/users"), userRoutes_1.router);
