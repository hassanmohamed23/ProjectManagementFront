import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../services/taskService';
import { Link,useNavigate } from 'react-router-dom';


function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role')); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // If no token, redirect to login
            navigate('/login');
            return;
        }
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                console.error("Error loading Tasks:", error);
            }
        };
        loadTasks();
    }, []);

    const handleDelete = async (TaskId) => {
        try {
            await deleteTask(TaskId);
            setTasks(tasks.filter((task) => task.taskId !== TaskId));

        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div className="container">
            <h2>Tasks</h2>
            {role === 'Manager' && (
                <Link to="/tasks/AddOrUpdate/0" className="btn btn-primary mb-3">
                    Add Task
                </Link>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>AssignedTo</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Project</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {role === 'Manager' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.taskId}>
                            <td>{task.taskName}</td>
                            <td>{task.description}</td>
                            <td>{task.assignedTo}</td>
                            <th>{task.status}</th>
                            <th>{task.priority}</th>
                            <th>{task.project?.projectName}</th>
                            <td>{new Date(task.startDate).toLocaleDateString()}</td>
                            <td>{new Date(task.endDate).toLocaleDateString()}</td>
                            {role === 'Manager' && (
                                <td>
                                    <Link to={`/tasks/AddOrUpdate/${task.taskId}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(task.taskId)}
                                        className="btn btn-danger btn-sm mx-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TasksList;
