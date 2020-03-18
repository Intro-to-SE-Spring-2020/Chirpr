const express = require('express')
const router = express.Router()

// import controllers
const { getChirps, createChirp, editChirp, deleteChirp } = require('../controllers/chirp')

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
router.post('/chirp', auth, createChirp)

// @route   PATCH api/chirp/:id
// @dec     Update chirp
// @access  Private
router.patch('/chirp/:id', auth, editChirp);

// @route   DELETE api/chirp/:id
// @dec     Update chirp
// @access  Private
router.delete('/chirp/:id', auth, deleteChirp);

module.exports = router
