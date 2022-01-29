/**
 * Logs out an authenticated user on all devices.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function logoutUserOnAllDevices(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch(e) {
    res.status(500).send()
  };
};

module.exports = logoutUserOnAllDevices;
