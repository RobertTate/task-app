const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const { 
  addNewTaskToUser, 
  getOneUserTask,
  getAllUserTasks,
  updateOneUserTask,
  deleteOneUserTask
} = require('../partials/routeHandlers/tasks');

const tasksRouter = Router();

tasksRouter.post('/', authMiddleware, addNewTaskToUser);

tasksRouter.get('/:id', authMiddleware, getOneUserTask);

tasksRouter.get('/', authMiddleware, getAllUserTasks);

tasksRouter.patch('/:id', authMiddleware, updateOneUserTask);

tasksRouter.delete('/:id', authMiddleware, deleteOneUserTask);

module.exports = { tasksRouter };
