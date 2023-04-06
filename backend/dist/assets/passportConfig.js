"use strict";
exports.__esModule = true;
exports.google = exports.facebook = void 0;
require("dotenv/config");
exports.facebook = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "".concat(process.env.API_BASED_URL, "/auth/facebook/callback"),
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
};
exports.google = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
};
