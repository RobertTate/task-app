const { Router } = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const { formatError } = require('../partials/formatError');

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

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

// UPDATE Operations
usersRouter.patch('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    user.set(req.body);
    await user.save();
    res.status(200).send(user);
  } catch(e) {
    if (
      e.name === "ValidationError" || 
      e.name === "StrictModeError" ||
      e.name === "CastError"
    ) {
      return res.status(400).send(formatError(e));
    }
    res.status(500).send(formatError(e));
  }
});

// DELETE Operations
usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

module.exports = { usersRouter };
