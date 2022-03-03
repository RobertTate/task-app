const { formatError } = require('../../errorHandling');
const { sendCancellationEmail } = require('../../../emails/emailFunctions');

/**
 * Deletes and responds with the authenticated user. Also deletes all tasks associated with the user.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function deleteUser(req, res) {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.status(200).send(req.user);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
};

module.exports = deleteUser;
