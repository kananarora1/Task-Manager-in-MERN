const Task = require('../Models/task');
const taskController = require('../Controllers/taskController');

const router = require('express').Router();

router.post('/create', taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.patch('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;