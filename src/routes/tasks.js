const { Router } = require('express');
const Task = require('../models/task');
const { formatError } = require('../partials/formatError');

const tasksRouter = Router()

// CREATE Operations
tasksRouter.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch(e) {
    res.status(400).send(formatError(e));
  }
});

// READ Operations
tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

tasksRouter.get('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

// UPDATE Operations
tasksRouter.patch('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    task.set(req.body);
    await task.save();
    res.status(200).send(task);
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
tasksRouter.delete('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
});

module.exports = { tasksRouter };
