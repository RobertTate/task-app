const sharp = require('sharp');

/**
 * Uploads an Avatar for the currently Authenticated User.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function uploadAvatar(req, res) {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}

module.exports = uploadAvatar;
