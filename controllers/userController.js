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
const User = require(`${__dirname}/../models/userModel.js`);
const authController = require('./authController.js');
// signup handler/controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            city: req.body.city,
            country: req.body.country
        });
        res.status(201).json({
            status: 'success',
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
// login handler/controller
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Please provide email and password!';
            const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
            return next(err);
        }
        const user = yield User.findOne({ email }).select('+password');
        if (!user || !(yield user.correctPassword(password))) {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Incorrect Email or Password!';
            const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
            return next(err);
        }
        res.status(201).json({
            status: 'success',
            token: authController.createToken(user)
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
module.exports = { signup, login };
