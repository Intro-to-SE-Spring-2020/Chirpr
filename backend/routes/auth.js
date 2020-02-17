const express = require('express');
const router = express.Router();

//import controller
const { signup, signin } = require('../controllers/auth');

// import validators
const {
    userSignupValidator,
    userSigninValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router; // {}
