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
app.use('/api/v1/weather',weatherRoute);
app.use('/api/v1/user',userRoute);

app.all('*',(req,res,next)=>{
    const err = new Error();
    err.status = 'fail';
    err.statusCode = 404;
    err.message = `Can't find ${req.originalUrl} on the server`;
    next(err);
}); 

app.use((err,req,res,next)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    });
});
module.exports = app;
