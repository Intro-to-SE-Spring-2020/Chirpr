const { validationResult } = require('express-validator')

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return status of unproccessable entity
    return res.status(422).json({
      error: errors.array()
    })
  }
  next()
}
