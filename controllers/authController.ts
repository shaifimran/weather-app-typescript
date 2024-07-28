import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../utils/ExtendedError";
import { stat } from "fs";

const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

interface User {
    _id: string
}

const createToken = (user: User) => {
    const token = jwt.sign({ id: user._id }, process.env.SIGNATURE, { expiresIn: '30s' });
    return token;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const decoded = jwt.verify(req.headers.authorization, process.env.SIGNATURE);
            if (decoded) {
                const currentUser = await User.findById(decoded.id);
                if (currentUser) {
                    if (!req.params.city) {
                        req.params.city = currentUser.city + ', ' + currentUser.country;
                    }
                    return next();
                } else {
                    let statusCode = 400;
                    let status = 'fail';
                    let message = 'User doesn\'t exist! Login to get access';
                    const err = new ExtendedError(statusCode, status, message);
                    return next(err);
                }
            } else {
                let statusCode = 400;
                let status = 'fail';
                let message = 'Authorization Failed...';
                const err = new ExtendedError(statusCode, status, message);
                return next(err);

            }
        } else {
            let statusCode = 400;
            let status = 'fail';
            let message = 'Authorization Failed...';
            const err = new ExtendedError(statusCode,status,message);
            return next(err);
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

module.exports = { createToken, verifyToken }