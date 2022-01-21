const { Router } = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const { formatError, getStatusCode } = require('../partials/errorHandling');

const usersRouter = Router()

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch(e) {
    res.status(400).send()
  }
});

usersRouter.post('/logout',  authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch(e) {
    res.status(500).send();
  }
}),

usersRouter.post('/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch(e) {
    res.status(500).send()
  };
});

// CREATE Operations
usersRouter.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch(e) {
    res.status(400).send(formatError(e));
  }
});

// READ Operations
usersRouter.get('/me', authMiddleware, async (req, res) => {
  res.status(200).send(req.user);
});

// UPDATE Operations
usersRouter.patch('/me', authMiddleware, async (req, res) => {
  try {
    req.user.set(req.body);
    await req.user.save();
    res.status(200).send(req.user);
  } catch(e) {
    res.status(getStatusCode(e)).send(formatError(e));
  }
});

// DELETE Operations
usersRouter.delete('/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

module.exports = { usersRouter };
