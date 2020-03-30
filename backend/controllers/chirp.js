// models
const Chirp = require('../models/Chirp')
const Profile = require('../models/Profile')

exports.getChirps = async (req, res) => {
  try {
    // 1. fetch from mongodb
    let chirps = await Chirp.find()
      .sort({ 'updatedAt': '-1' })
    let userProfile;

    const result = chirps.map(async elem => {
      
      let isOwned = false;
      let isLiked = false;
      let isReChirped = false;
      const reqUser = req.user.toString()
      const elemUser = elem.user.toString()
      const elemLike = elem.likes.filter(like => like == reqUser)
      const elemReChirp = elem.retweets.filter(retweet => retweet == reqUser)
      if (reqUser === elemUser) isOwned = true
      if (elemLike.length > 0) isLiked = true
      if (elemReChirp.length > 0) isReChirped = true
      
      // FIXME: potential bottleneck
      userProfile = await Profile.findOne({ user: elem.user })

      const {
        user,
        content,
        retweets,
        likes,
        createdAt,
        updatedAt,
        _id
      } = elem

      try {
        const { first_name, last_name, username } = userProfile;;
        const name = `${first_name} ${last_name}`;

        return {
          _id,
          name,
          username,
          user,
          isOwned,
          isLiked,
          isReChirped,
          content,
          retweets,
          likes,
          createdAt,
          updatedAt
        }

      } catch (err) {
        return {
          user,
          content,
          retweets,
          likes,
          createdAt,
          updatedAt,
          _id
        }
      }
    })
    chirps = await Promise.all(result)
    // console.log(newChirps)

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
          error: err
        })
      }
      res.json(chirp)
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.editChirp = async (req, res) => {
  try {
    const { content } = req.body
    const { id } = req.params

    const chirp = await Chirp.findByIdAndUpdate(
      { _id: id },
      { content },
      { new: true }
    )
    res.json(chirp)

  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.deleteChirp = async (req, res) => {
  try {
    const { id } = req.params

    await Chirp.findByIdAndDelete({ _id: id })
    const result = await Chirp.findById({ _id: id })
    
    if (!result) {
      res.status(200).json({
        msg: "Chirp deleted!"
      })
    }

  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.likeOrUnlikeChirp = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req

    const chirp = await Chirp.findById(id, "likes");

    if (chirp) {
      let count = chirp.likes.length;
      let isLiked = false;
      if (chirp.likes.includes(user)) {
        // unlike the chirp
        chirp.update(
          { $pull: { likes: user } },
          (err, data) => {
            if (err) {
              return res.status(400).json({
                error: err
              })
            } else {
              count -= 1;
              return res.status(200).json({
                msg: 'unliked',
                count,
                isLiked
              })
            }
          }
        )
      } else {
        // like the chirp
        isLiked = true;
        chirp.update(
          { $push: { likes: user } },
          (err, data) => {
            if (err) {
              return res.status(400).json({
                error: err
              })
            } else {
              count += 1;
              return res.status(200).json({
                msg: 'liked',
                count,
                isLiked
              })
            }
          }
        )
      }

    }

  } catch (err) {
    res.status(500).send('Server error')
  }
}

exports.updateReChirp = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req

    const chirp = await Chirp.findById(id, "retweets");

    if (chirp) {
      let count = chirp.retweets.length;
      let isReChirped = false;
      if (chirp.retweets.includes(user)) {
        // remove rechirp the chirp
        chirp.update(
          { $pull: { retweets: user } },
          (err, data) => {
            if (err) {
              return res.status(400).json({
                error: err
              })
            } else {
              count -= 1;
              return res.status(200).json({
                msg: 'Removed ReChirp!',
                count,
                isReChirped
              })
            }
          }
        )
      } else {
        // rechirp the chirp
        isReChirped = true;
        chirp.update(
          { $push: { retweets: user } },
          (err, data) => {
            if (err) {
              return res.status(400).json({
                error: err
              })
            } else {
              count += 1;
              return res.status(200).json({
                msg: 'ReChirped',
                count,
                isReChirped
              })
            }
          }
        )
      }

    }

  } catch (err) {
    res.status(500).send('Server error')
  }
}
