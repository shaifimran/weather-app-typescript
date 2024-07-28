"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedError_1 = require("../utils/ExtendedError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const createToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.SIGNATURE, { expiresIn: '30s' });
    return token;
};
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            const decoded = jwt.verify(req.headers.authorization, process.env.SIGNATURE);
            if (decoded) {
                const currentUser = yield User.findById(decoded.id);
                if (currentUser) {
                    if (!req.params.city) {
                        req.params.city = currentUser.city + ', ' + currentUser.country;
                    }
                    return next();
                }
                else {
                    let statusCode = 400;
                    let status = 'fail';
                    let message = 'User doesn\'t exist! Login to get access';
                    const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
                    return next(err);
                }
            }
            else {
                let statusCode = 400;
                let status = 'fail';
                let message = 'Authorization Failed...';
                const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
                return next(err);
            }
        }
        else {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Authorization Failed...';
            const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
            return next(err);
        }
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
});
module.exports = { createToken, verifyToken };
