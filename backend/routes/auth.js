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

// @route   POST api/signup
// @desc    Register user
// @access  Public
router.post('/signup', userSignupValidator, runValidation, signup);

// @route   POST api/signin
// @desc    Signin user
// @access  Public
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router; // {}
