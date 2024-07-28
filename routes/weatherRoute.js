const express = require('express');
const weatherHandler = require('../controllers/weatherController.js');
const authController = require('./../controllers/authController.js');
const weatherRoute = express.Router();


weatherRoute.route('/:city?').get(authController.verifyToken,weatherHandler);

module.exports = weatherRoute;