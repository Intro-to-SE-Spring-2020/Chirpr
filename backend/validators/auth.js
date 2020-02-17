const { check } = require('express-validator');

exports.userSignupValidator = [
    check('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),

    check('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required'),

    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
        
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
        
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
]
