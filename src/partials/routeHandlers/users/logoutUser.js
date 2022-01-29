/**
 * Logs out an authenticated user.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function logoutUser(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch(e) {
    res.status(500).send();
  }
}

module.exports = logoutUser;
