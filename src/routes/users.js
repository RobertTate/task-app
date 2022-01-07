const { Router } = require('express');
const User = require('../models/user');
const { errorObject } = require('../partials/errorObject');

const usersRouter = Router()

// GET Routes
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch(e) {
    res.status(500).send(errorObject(e));
  }
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
    res.status(500).send(errorObject(e));
  }
});

// POST Routes
usersRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch(e) {
    res.status(400).send(errorObject(e));
  }
});

// PATCH Routes
usersRouter.patch('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch(e) {
    if (
      e.name === "ValidationError" || 
      e.name === "StrictModeError" ||
      e.name === "CastError"
    ) {
      return res.status(400).send(errorObject(e));
    }
    res.status(500).send(errorObject(e));
  }
});

// DELETE Routes
usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch(e) {
    res.status(500).send(errorObject(e));
  }
});

module.exports = { usersRouter };
