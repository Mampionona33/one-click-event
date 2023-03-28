"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FacebookStrategy = passport_facebook_1.default.Strategy;
exports.router = (0, express_1.Router)();
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );
// router.get('/auth/facebook', passport.authenticate('facebook'));
// router.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );
