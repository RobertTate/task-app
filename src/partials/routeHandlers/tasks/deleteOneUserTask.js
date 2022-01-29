const Task = require('../../../models/task');
const { formatError } = require('../../errorHandling');

/**
 * Deletes the requested task of the current authenticated user, and then responds with the deleted task.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function deleteOneUserTask(req, res) {
  try {
    const { id: _id } = req.params;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    };

    res.status(200).send(task);
  } catch(e) {
    res.status(500).send(formatError(e));
  };
};

module.exports = deleteOneUserTask;
