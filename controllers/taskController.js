import Task from '../models/Task.js';
import taskValidator from '../validator/taskValidator.js';
import { validationResult } from 'express-validator';


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description } = req.body; // Removed attachment from destructuring
    try {
        let attachment = null;
        if (req.file) { 
            attachment = {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            };
        }
        const task = await Task.create({ title, description, attachment, user: req.user.id });
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        // First get the existing task to preserve current attachment if no new file
        const existingTask = await Task.findById(req.params.id);
        if (!existingTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Prepare update data
        const updateData = { title, description, status };
        
        // Handle attachment logic
        if (req.file) { 
            // New file uploaded, create new attachment object
            updateData.attachment = {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            };
        } else {
            // No new file, keep existing attachment
            updateData.attachment = existingTask.attachment;
        }

        const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export { getTasks, createTask, updateTask, deleteTask, getTaskById };