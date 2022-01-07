const { Router } = require('express');
const Task = require('../models/task');
const { errorObject } = require('../partials/errorObject');

const tasksRouter = Router()

// GET Routes
tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks);
  } catch(e) {
    res.status(500).send(errorObject(e));
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
    res.status(500).send(errorObject(e));
  }
});

// POST Routes
tasksRouter.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch(e) {
    res.status(400).send(errorObject(e));
  }
});

// PATCH Routes
tasksRouter.patch('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
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
tasksRouter.delete('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(errorObject(e));
  }
});

module.exports = { tasksRouter };
