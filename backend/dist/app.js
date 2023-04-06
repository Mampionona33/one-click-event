"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var authController_1 = require("./controller/authController");
require("dotenv/config");
exports.app = (0, express_1["default"])();
exports.app.use(express_1["default"].json());
exports.app.use(express_1["default"].urlencoded({ extended: true }));
exports.app.use('/', authController_1.router);
exports.app.get('/', function (req, res, next) {
    res.redirect('/api/v1');
});
var whiteList = [process.env.CLIENT_BASED_URL];
var corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
exports.app.get('/api/v1', function (req, res, next) {
    res.send('welcom to my app');
});
// app.get(
//   '/api/v1',
//   cors(corsOptions),
//   (req: Request, res: Response, next: NextFunction) => {
//     res.send('welcom to my app');
//   }
// );
//////////  LOGGER //////////
if (process.env.NODE_ENV != 'production') {
    console.table([
        {
            Variables: 'facebookCallbackUrl',
            url: process.env.FACEBOOK_CALLBACK_URL
        },
        {
            Variables: 'process.env.FACEBOOK_APP_ID',
            url: process.env.FACEBOOK_APP_ID
        },
        {
            Variables: 'process.env.FACEBOOK_APP_SECRET',
            url: process.env.FACEBOOK_APP_SECRET
        },
        {
            Variables: 'process.env.CLIENT_BASED_URL',
            url: process.env.CLIENT_BASED_URL
        },
        {
            Variables: 'process.env.GOOGLE_CLIENT_ID',
            url: process.env.GOOGLE_CLIENT_ID
        },
        {
            Variables: 'process.env.GOOGLE_CLIENT_SECRET',
            url: process.env.GOOGLE_CLIENT_SECRET
        },
        {
            Variables: 'process.env.GOOGLE_CALLBACK_URL',
            url: process.env.GOOGLE_CALLBACK_URL
        },
    ]);
}
