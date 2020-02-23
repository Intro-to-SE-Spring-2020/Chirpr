const express = require('express')
const router = express.Router()

// import controllers
const { getChirps, createChirp } = require('../controllers/chirp')

// import middleware
const { auth } = require('../middleware/auth')

// import validators

// @route   GET api/chirp
// @dec     Get a list of all recent chirps
// @access  Private
router.get('/chirp', auth, getChirps)

// @route   POST api/chirp
// @dec     Create a chirp
// @access  Private
router.get('/chirp', auth, createChirp)

// @route   GET api/chirp/:id
// @dec     Ger a chirp by id
// @access  Private
// router.get('/chirp', auth, getChirpById);

module.exports = router
