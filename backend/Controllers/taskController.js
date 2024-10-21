const { where } = require('sequelize');
const Task = require('../Models/task');

exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.send({
            success: true,
            message: 'Task created',
            taskId: newTask._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Not able to create task " + error });
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ message: "Not able to fetch tasks " + error });
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        res.send(task);
    } catch (error) {
        res.status(500).json({ message: "Not able to fetch task " + error });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        await task.update(req.body);
        res.send({
            success: true,
            message: 'Task updated',
            taskId: task._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Not able to update task " + error });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        await task.destroy();
        res.send({
            success: true,
            message: 'Task deleted',
            taskId: task._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Not able to delete task " + error });
    }
}