const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const {
  loginUser,
  logoutUser,
  logoutUserOnAllDevices,
  createNewUser,
  getUser,
  updateUser,
  deleteUser
} = require('../partials/routeHandlers/users');

const usersRouter = Router();

usersRouter.post('/login', loginUser);

usersRouter.post('/logout',  authMiddleware, logoutUser),

usersRouter.post('/logoutAll', authMiddleware, logoutUserOnAllDevices);

usersRouter.post('/signup', createNewUser);

usersRouter.get('/me', authMiddleware, getUser);

usersRouter.patch('/me', authMiddleware, updateUser);

usersRouter.delete('/me', authMiddleware, deleteUser);

module.exports = { usersRouter };
