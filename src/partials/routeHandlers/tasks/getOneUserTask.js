const Task = require('../../../models/task');
const { formatError } = require('../../errorHandling');

/**
 * Responds with the requested task of an authenticated user.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 */
async function getOneUserTask(req, res) {
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
}

module.exports = getOneUserTask;
