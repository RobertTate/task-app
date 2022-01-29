const Task = require('../../../models/task');
const { formatError } = require('../../errorHandling');

/**
 * Creates a new task, sets its owner to the currently authenticated user, saves it to the database, and responds back with the new task.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function addNewTaskToUser(req, res) {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });

    await task.save();
    res.status(201).send(task);
  } catch(e) {
    res.status(400).send(formatError(e));
  };
};

module.exports = addNewTaskToUser;
