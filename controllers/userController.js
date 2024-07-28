const User = require(`${__dirname}/../models/userModel.js`);
const authController = require('./authController.js');

// signup handler/controller
const signup = async (req, res) => {
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
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const err = new Error();
            err.statusCode = 400;
            err.status = 'fail';
            err.message = 'Please provide email and password!';
            return next(err);
        }

        const user = await User.findOne({email}).select('+password');

        if (!user || !(await user.correctPassword(password))) {
            const err = new Error();
            err.statusCode = 400;
            err.status = 'fail';
            err.message = 'Incorrect Email or Password!';
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