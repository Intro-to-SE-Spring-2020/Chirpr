const express = require('express');
const router = express.Router();

// import controllers
const { getProfile, createOrUpdateProfile } = require('../controllers/profile')

// import validators
const { userProfileValidator } = require('../validators/profile');
const { runValidation } = require('../validators');

// import middleware
const { auth } = require('../middleware/auth');

// @route   GET api/user/profile/:id
// @desc    Get a user profile that is not own
// @access  Private
router.get('/user/profile/:username', auth, getProfile);

// @route   POST api/user/profile/createOrUpdate
// @desc    Create or Update current user profile
// @access  Private
router.post('/user/profile/createOrUpdate',
    userProfileValidator,
    runValidation,
    auth,
    createOrUpdateProfile
    );

module.exports = router;
