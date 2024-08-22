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

exports.filterTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                status: req.query.status,
                priority: req.query.priority,
            }
        });
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ message: "Not able to filter tasks " + error });
    }
}

exports.searchTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                [where.or]: [
                    { title: { [where.like]: `%${req.query.search}%` } },
                    { description: { [where.like]: `%${req.query.search}%` } },
                ]
            }
        });
        res.send(tasks);
    } catch (error) {
        res.status(500).json({ message: "Not able to search tasks " + error }); 
    }
};

exports.getPaginatedTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Task.findAndCountAll({
            where: { userId: req.user.id }, 
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            tasks: rows,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalTasks: count,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
};

