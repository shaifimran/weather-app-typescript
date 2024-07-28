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
const axios = require('axios');
const getWeather = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.params.city || next(Error('Please Enter a City Name!'));
    const geoCodingAPI = yield axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    if (geoCodingAPI.data.results) {
        const { latitude, longitude } = geoCodingAPI.data.results[0];
        const weatherResponse = yield axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        res.status(200).json(weatherResponse.data);
    }
    else {
        res.status(400).json({
            status: 'fail',
            message: 'Please enter a valid city name!'
        });
    }
});
module.exports = getWeather;
