const User = require('../../../models/user');
const { formatError } = require('../../errorHandling');

/**
 * Creates a new user and signs them in.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function createNewUser(req, res) {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch(e) {
    res.status(400).send(formatError(e));
  }
};

module.exports = createNewUser;
