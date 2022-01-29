const { formatError } = require('../../errorHandling');


/**
 * @typedef {object} requestQuery
 * @property {string} completed - The `completed` query parameter. Values are 'true' or 'false'
 * @property {string} sortBy - The `sortBy` query parameter. Values are a valid document field and 'asc' or 'desc' joined with an underscore. ie: `?sortBy=createdAt_desc`.
 * @property {string} limit - The `limit` query parameter. Values are a valid integer.
 * @property {string} skip - The `skip` query parameter. Values are a valid integer.
*/

/**
 * Responds with all tasks of an authenticated user.
 * 
 * Query Parameters:
 * * `completed`. Values are 'true' or 'false'
 * * `sortBy`. Values are a valid document field and 'asc' or 'desc' joined with an underscore. ie: `?sortBy=createdAt_desc`.
 * * `limit`. Values are a valid integer.
 * * `skip`. Values are a valid integer.
 * 
 * @param {import('express').Request<{}, {}, {}, requestQuery>} req The express request object
 * @param {import('express').Response} res The express response object
 * 
*/
async function getAllUserTasks(req, res) {
  try {
    const match = {};
    const completedOptions = {
      'true': true,
      'false': false
    }
    const validCompletedSetting = completedOptions[req.query.completed];

    validCompletedSetting !== undefined && (match.completed = validCompletedSetting);

    const sort = {};
    const sortOrderOptions = {
      'asc': 1,
      'desc': -1
    }
    const [field, order] = req.query.sortBy ? req.query.sortBy.split('_') : [];
    sort[field] = sortOrderOptions[order];

    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    });
    res.status(200).send(req.user.tasks);
  } catch(e) {
    res.status(500).send(formatError(e));
  }
}

module.exports = getAllUserTasks;
