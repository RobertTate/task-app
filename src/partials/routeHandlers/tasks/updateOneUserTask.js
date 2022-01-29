const Task = require('../../../models/task');
const { formatError, getStatusCode } = require('../../errorHandling');

/**
 * Updates the requested task of the current authenticated user, and then responds with the updated task.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function updateOneUserTask(req, res) {
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
}

module.exports = updateOneUserTask;
