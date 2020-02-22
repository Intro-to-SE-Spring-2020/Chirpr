const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const profile = await Profile.findOne({ username: username })
            .select('-_id');
           
        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile for this username'
            });
        }

        res.json(profile);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.createOrUpdateProfile = async (req, res) => {
    const { first_name, last_name, username, bio, dob } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user });

        if (profile) {
            // update since user has profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user },
                { first_name, last_name, username, bio, dob },
                { new: true }
            );
            return res.json(profile);
        }

        // create user profiles b/c it doesn't exist
        profile = new Profile({ user: req.user, first_name, last_name, username, bio, dob });

        await profile.save((err, success) => {
            if (err) {
                console.log('Profile Creation Error: ', err);
                return res.status(400).json({
                    errors: [{ msg: err }]
                });
            }
            res.json(profile);
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
