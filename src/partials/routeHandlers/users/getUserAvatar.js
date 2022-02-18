const User = require('../../../models/user');

/**
 * Responds with an Avatar Image for the matching User ID.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function getUserAvatar(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch(e) {
    res.status(400).send();
  }
}

module.exports = getUserAvatar;
