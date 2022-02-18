/**
 * Deletes the Avatar for the currently Authenticated User.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function deleteAvatar(req, res) {
  if (!req.user.avatar) {
    return res.status(400).send();
  }

  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

module.exports = deleteAvatar;
