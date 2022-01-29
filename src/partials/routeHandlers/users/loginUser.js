const User = require('../../../models/user');

/**
 * Logs in a user if they already have an account.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch(e) {
    res.status(400).send()
  }
}

module.exports = loginUser;
