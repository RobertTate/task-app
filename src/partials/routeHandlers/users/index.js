const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const logoutUserOnAllDevices = require('./logoutUserOnAllDevices');
const createNewUser = require('./createNewUser');
const uploadAvatar = require('./uploadAvatar');
const deleteAvatar = require('./deleteAvatar');
const getUserAvatar = require('./getUserAvatar');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

module.exports = {
  loginUser,
  logoutUser,
  logoutUserOnAllDevices,
  createNewUser,
  uploadAvatar,
  deleteAvatar,
  getUserAvatar,
  getUser,
  updateUser,
  deleteUser
};
