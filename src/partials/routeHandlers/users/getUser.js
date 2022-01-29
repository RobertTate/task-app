/**
 * Responds with the authenticated user.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function getUser(req, res) {
  res.status(200).send(req.user);
};

module.exports = getUser;
