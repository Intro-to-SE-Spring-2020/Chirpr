const { check } = require('express-validator')

exports.userProfileValidator = [
  check('first_name')
    .not()
    .isEmpty()
    .withMessage('First name is required'),
  check('last_name')
    .not()
    .isEmpty()
    .withMessage('Last name is required'),
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required'),
  check('bio')
    .isLength({ max: 120 })
    .withMessage('Bio cannot be more than 120 characters')
]
