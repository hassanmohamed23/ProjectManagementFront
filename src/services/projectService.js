import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/Projects`;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Content-Type']="application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export async function fetchProjects() {
    try {
        const response = await apiClient.get(`/GetAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
export async function getProjectById(projectId) {
    try {
        const response = await apiClient.get(`/GetById/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export async function createProject(project) {
    try {
        const response = await apiClient.post(`/Create`, project);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export async function updateProject( updatedProject) {
    try {
        const response = await apiClient.put(`/Update`, updatedProject);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}

export async function deleteProject(projectId) {
    try {
        await apiClient.delete(`/Delete/${projectId}`);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function fetchProjectStatistics()
{
    try {
        await apiClient.get(`/GetProjectStatistics`);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}
