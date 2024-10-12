const { body } = require('express-validator');

// Define signup validation
const signupValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    // add other validations as needed
];

// Define login validation (if applicable)
const loginValidation = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
    signupValidation,
    loginValidation,
};
