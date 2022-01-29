const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const logoutUserOnAllDevices = require('./logoutUserOnAllDevices');
const createNewUser = require('./createNewUser');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

module.exports = {
  loginUser,
  logoutUser,
  logoutUserOnAllDevices,
  createNewUser,
  getUser,
  updateUser,
  deleteUser
};
