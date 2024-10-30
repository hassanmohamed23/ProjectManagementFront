import React, { useState, useEffect } from 'react';
import { createProject, updateProject, getProjectById } from '../services/projectService';
import { useNavigate, useParams } from 'react-router-dom';
import { Enums } from '../services/Enums';

const AddOrEditProject = () => {
    const [project, setProject] = useState({
        projectId: 0,
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        owner: '',
        status: Enums.TaskStatus.Pending,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Load project data if an ID is provided (edit mode)
            const fetchProject = async () => {
                try {
                    const projectData = await getProjectById(id);
                    setProject(projectData);
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            };
            fetchProject();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id>0) {
                // Update project if in edit mode
                await updateProject(project);
                console.log('Project updated successfully:', project);
            } else {
                // Create new project if in add mode
                console.log(project);

                await createProject(project);
                
            }
            navigate('/projects');
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-500">
            <h1 className="mb-4">{id >0 ? 'Update Project' : 'Add New Project'}</h1>
            <div className="card p-4 shadow">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="projectName"
                            value={project.projectName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={project.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={project.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Budget</label>
                        <input
                            type="number"
                            className="form-control"
                            name="budget"
                            value={project.budget}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Owner</label>
                        <input
                            type="text"
                            className="form-control"
                            name="owner"
                            value={project.owner}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-control"
                            name="status"
                            value={project.status}
                            onChange={handleChange}
                        >
                            <option value={Enums.TaskStatus.Pending}>Pending</option>
                            <option value={Enums.TaskStatus.InProgress}>In Progress</option>
                            <option value={Enums.TaskStatus.Completed}>Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {id >0 ? 'Update Project' : 'Add Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrEditProject;
