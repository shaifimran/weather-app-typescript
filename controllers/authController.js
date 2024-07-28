const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');


const createToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.SIGNATURE,{expiresIn:'30s'});
    return token;
};

const verifyToken = async (req, res, next) => {
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
                    const err = new Error();
                    err.statusCode = 400;
                    err.status = 'fail';
                    err.message = 'User doesn\'t exist! Login to get access';
                    return next(err);
                }
            } else {
                const err = new Error();
                err.statusCode = 400;
                err.status = 'fail';
                err.message = 'Authorization Failed...';
                return next(err);

            }
        } else {
            const err = new Error();
            err.statusCode = 400;
            err.status = 'fail';
            err.message = 'Authorization Failed...';
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