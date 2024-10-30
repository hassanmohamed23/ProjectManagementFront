import React, { useState, useEffect } from 'react';
import { Enums } from '../services/Enums';
import { createTask, getTaskById, updateTask } from '../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';

const AddOrEditTask = () => {
    const { id } = useParams(); // Get task ID from the URL if in edit mode
    const navigate = useNavigate();
    const isEditMode = id > 0;

    const [task, setTask] = useState({
        taskId: 0,
        taskName: '',
        description: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        priority: Enums.TaskPriority.Medium, // Default value
        status: Enums.TaskStatus.Pending, // Default value
        projectId: '',
        project: null,
    });

    useEffect(() => {
        if (isEditMode) {
            // Fetch existing task data if we're in edit mode
            const fetchTask = async () => {
                const existingTask = await getTaskById(id);
                if (existingTask) setTask(existingTask);
            };
            fetchTask();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Update existing task
            await updateTask(task);
            console.log('Task updated successfully:', task);
        } else {
            // Create new task
            const newTask = await createTask(task);
            console.log('Task created successfully:', newTask);
        }

        navigate('/tasks');
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100">
            <h1 className="mb-4">{isEditMode ? 'Edit Task' : 'Add Task'}</h1>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="taskName" className="form-label">Task Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="taskName"
                            name="taskName"
                            value={task.taskName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                        <input
                            type="text"
                            className="form-control"
                            id="assignedTo"
                            name="assignedTo"
                            value={task.assignedTo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="startDate"
                                name="startDate"
                                value={task.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDate"
                                name="endDate"
                                value={task.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select
                            className="form-select"
                            id="priority"
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option value={Enums.TaskPriority.Low}>Low</option>
                            <option value={Enums.TaskPriority.Medium}>Medium</option>
                            <option value={Enums.TaskPriority.High}>High</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                        >
                            <option value={Enums.TaskStatus.Pending}>Pending</option>
                            <option value={Enums.TaskStatus.InProgress}>In Progress</option>
                            <option value={Enums.TaskStatus.Completed}>Completed</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="projectId" className="form-label">Project ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="projectId"
                            name="projectId"
                            value={task.projectId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {isEditMode ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrEditTask;
