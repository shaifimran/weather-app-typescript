import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../utils/ExtendedError";

const User = require(`${__dirname}/../models/userModel.js`);
const authController = require('./authController.js');

// signup handler/controller
const signup = async (req:Request, res:Response) => {
    try {
        const newUser = await User.create({
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
    } catch (err) {

        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// login handler/controller
const login = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Please provide email and password!';
            const err = new ExtendedError(statusCode,status,message);
            return next(err);
        }

        const user = await User.findOne({email}).select('+password');

        if (!user || !(await user.correctPassword(password))) {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Incorrect Email or Password!';
            const err = new ExtendedError(statusCode,status,message);
            return next(err);
        }

        res.status(201).json({
            status: 'success',
            token: authController.createToken(user)
        });
    } catch (err) {

        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


module.exports = { signup, login }