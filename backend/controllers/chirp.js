// models
const Chirp = require('../models/Chirp')

exports.getChirps = async (req, res) => {
  try {
    // 1. fetch from mongodb
    const chirps = await Chirp.find()
    if (chirps) {
      return res.json({
        chirps
      })
    } else {
      return res.status(204).json({
        msg: 'No Chirps were found'
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.createChirp = async (req, res) => {
  try {
    // 1. destructure data
    const { content } = req.body
    const { user } = req

    // 2. Create chirp
    const chirp = new Chirp({ user, content })

    await chirp.save((err, success) => {
      if (err) {
        console.log('Chirp Creation Error: ', err)
        return res.status(400).json({
          errors: [{ msg: err }]
        })
      }
      res.json(chirp)
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
