import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/Tasks`;

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function fetchTasks() {
    try {
        const response = await apiClient.get('/GetAll');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export async function getTaskById(taskId) {
    try {
        const response = await apiClient.get(`/GetById/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export async function createTask(project) {
    try {
        const response = await apiClient.post('/Create', project);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export async function updateTask( updatedProject) {
    try {
        const response = await apiClient.put('/Update', updatedProject);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export async function deleteTask(projectId) {
    try {
        await apiClient.delete(`/Delete/${projectId}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }   
}
export async function getOverDueTasks(projectId) {
    try {
        const response = await apiClient.get('/GetOverdueTasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching over due tasks:', error);
        throw error;
    }
}
