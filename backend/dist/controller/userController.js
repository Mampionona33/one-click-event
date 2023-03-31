"use strict";
exports.__esModule = true;
exports.getUsers = void 0;
var getUsers = function (req, res, next) {
    var user = {
        name: 'Mampionona',
        lastName: 'Ramahazomananana',
        sex: 'Male'
    };
    res.status(200).json({
        status: 'succes',
        data: { user: user }
    });
    next();
};
exports.getUsers = getUsers;
