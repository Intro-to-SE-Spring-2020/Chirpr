const { check } = require('express-validator');

exports.userProfileValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
        
    check('bio')
        .isLength({max: 120})
        .withMessage('Bio cannot be more than 120 characters')
]
