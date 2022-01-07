const { Router } = require('express');
const Task = require('../models/task');

const tasksRouter = Router()

tasksRouter.get('/', (req, res) => {
  Task.find({})
  .then((tasks) => {
    res.status(200).send(tasks);
  })
  .catch((error) => {
    res.status(500).send(error);
  })
});

tasksRouter.get('/:id', (req, res) => {
  const { id: _id } = req.params;

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  }).catch((error) => {
    res.status(500).send(error)
  })
});


tasksRouter.post('/', (req, res) => {
  new Task(req.body).save()
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});

module.exports = { tasksRouter };
