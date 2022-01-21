const { Router } = require('express');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');
const { formatError, getStatusCode } = require('../partials/errorHandling');

const tasksRouter = Router()

// CREATE Operations
tasksRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });

    await task.save();
    res.status(201).send(task);
  } catch(e) {
    res.status(400).send(formatError(e));
  }
});

// READ Operations
tasksRouter.get('/', authMiddleware, async (req, res) => {
  try {
    await req.user.populate('tasks');
    res.status(200).send(req.user.tasks);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

tasksRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

// UPDATE Operations
tasksRouter.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    task.set(req.body);

    await task.save();
    res.status(200).send(task);
  } catch(e) {
    res.status(getStatusCode(e)).send(formatError(e));
  }
});

// DELETE Operations
tasksRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

module.exports = { tasksRouter };
