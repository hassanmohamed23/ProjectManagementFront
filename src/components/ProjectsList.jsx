import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../services/projectService';
import { Link,useNavigate } from 'react-router-dom';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role')); 
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            // If no token, redirect to login
            navigate('/login');
            return;
        }
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error loading projects:", error);
            }
        };
        loadProjects();
    }, []);

    const handleDelete = async (projectId) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter((project) => project.projectId !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div className="container">
            <h2>Projects</h2>
            {role === 'Manager' && (
                <Link to="/projects/AddOrUpdate/0" className="btn btn-primary mb-3">
                    Add Project
                </Link>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {role === 'Manager' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.projectId}>
                            <td>{project.projectName}</td>
                            <td>{project.description}</td>
                            <td>{project.budget}</td>
                            <th>{project.status}</th>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{new Date(project.endDate).toLocaleDateString()}</td>
                            {role === 'Manager' && (
                                <td>
                                    <Link to={`/projects/AddOrUpdate/${project.projectId}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.projectId)}
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

export default ProjectsList;
