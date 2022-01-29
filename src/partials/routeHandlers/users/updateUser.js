const { formatError, getStatusCode } = require('../../errorHandling');

/**
 * Updates and responds with the authenticated user.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function updateUser(req, res) {
  try {
    req.user.set(req.body);
    await req.user.save();
    res.status(200).send(req.user);
  } catch(e) {
    res.status(getStatusCode(e)).send(formatError(e));
  }
};

module.exports = updateUser;
