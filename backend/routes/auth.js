const express = require('express')
const router = express.Router()

// import controller
const { signup, signin } = require('../controllers/auth')

// import validators
const {
  userAuthValidator
} = require('../validators/auth')
const { runValidation } = require('../validators')

// @route   POST api/signup
// @desc    Register user
// @access  Public
router.post('/signup', userAuthValidator, runValidation, signup)

// @route   POST api/signin
// @desc    Signin user
// @access  Public
router.post('/signin', userAuthValidator, runValidation, signin)

module.exports = router // {}
