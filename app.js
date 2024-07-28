"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtendedError_1 = require("./utils/ExtendedError");
// const cors = require('cors'); for access from different origin
const express = require('express');
const weatherRoute = require(`${__dirname}/routes/weatherRoute.js`);
const app = express();
const userRoute = require(`${__dirname}/routes/userRoute.js`);
// middleware
app.use(express.json());
// app.use(cors());
app.use(express.static(`${__dirname}/public`));
// routes
app.use('/api/v1/weather', weatherRoute);
app.use('/api/v1/user', userRoute);
app.all('*', (req, res, next) => {
    let status = 'fail';
    let statusCode = 404;
    let message = `Can't find ${req.url} on the server`;
    const err = new ExtendedError_1.ExtendedError(statusCode, status, message);
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
module.exports = app;
