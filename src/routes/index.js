const { Router } = require('express');
const { usersRouter } = require('./users');
const { tasksRouter } = require('./tasks');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/tasks', tasksRouter);

module.exports = { apiRouter };
