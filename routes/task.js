const router = require('express').Router;
const taskRouter = router();
const createTaskController = require('../controllers/task/create')
const getAllTasksController = require('../controllers/task/get.all.tasks')
const updateTaskController = require('../controllers/task/update')
const deleteTaskController = require('../controllers/task/delete')
const {validateSchema, createTaskSchema, updateTaskSchema} = require('../middlewares/joi.middleware')
const {authenticateToken} = require('../middlewares/jwt.middleware')
taskRouter.get('/', authenticateToken(),getAllTasksController)
taskRouter.post('/create', authenticateToken(), validateSchema(createTaskSchema,'task'),createTaskController)
taskRouter.put('/update/:taskId', authenticateToken(), validateSchema(updateTaskSchema,'task'),updateTaskController)
taskRouter.delete('/delete/:taskId', authenticateToken(), deleteTaskController)

module.exports = taskRouter


