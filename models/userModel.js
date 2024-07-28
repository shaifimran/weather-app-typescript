const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid Email!']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: function (el) {
                return this.password === el;
            },
            message: 'Passwords didn\'nt match!'
        }
    },
    city: {
        type: String,
        default: 'Islamabad'
    },
    country: {
        type: String,
        default: 'Pakistan'
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;