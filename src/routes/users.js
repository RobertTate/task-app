const { Router } = require('express');
const uploadAvatarConfig = require('../partials/uploadAvatarConfig');
const authMiddleware = require('../middleware/auth');
const {
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
} = require('../partials/routeHandlers/users');

const usersRouter = Router();

usersRouter.post('/login', loginUser);

usersRouter.post('/logout', authMiddleware, logoutUser);

usersRouter.post('/logoutAll', authMiddleware, logoutUserOnAllDevices);

usersRouter.post('/signup', createNewUser);

usersRouter.get('/me', authMiddleware, getUser);

usersRouter.patch('/me', authMiddleware, updateUser);

usersRouter.delete('/me', authMiddleware, deleteUser);

usersRouter.post('/me/avatar', authMiddleware, uploadAvatarConfig.single('avatar'), uploadAvatar,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

usersRouter.delete('/me/avatar', authMiddleware, deleteAvatar);

usersRouter.get('/user/:id/avatar', getUserAvatar);

module.exports = { usersRouter };
