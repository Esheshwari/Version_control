import axios from 'axios';

const API_URL = 'http://localhost:3002';

const api = axios.create({
  baseURL: API_URL,
});

// Intercept and add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  signup: (data) => axios.post(`${API_URL}/signup`, data),
  login: (data) => axios.post(`${API_URL}/login`, data),
};

// User endpoints (protected)
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserProfile: (userId) => api.get(`/user/${userId}`),
  updateProfile: (userId, data) => api.put(`/user/update/${userId}`, data),
  deleteProfile: (userId) => api.delete(`/user/delete/${userId}`),
};

// Repo endpoints
export const repoAPI = {
  createRepo: (data) => api.post('/repo/create', data),
  getAllRepos: () => api.get('/repo/all'),
  getRepoById: (id) => api.get(`/repo/${id}`),
  getRepoByName: (name) => api.get(`/repo/name/${name}`),
  getUserRepos: (userId) => api.get(`/repo/user/${userId}`),
  updateRepo: (id, data) => api.put(`/repo/update/${id}`, data),
  deleteRepo: (id) => api.delete(`/repo/delete/${id}`),
  toggleVisibility: (id) => api.patch(`/repo/toggle/${id}`),
};

// Issue endpoints
export const issueAPI = {
  createIssue: (repoId, data) => api.post(`/issue/create/${repoId}`, data),
  updateIssue: (id, data) => api.put(`/issue/update/${id}`, data),
  deleteIssue: (id) => api.delete(`/issue/delete/${id}`),
  getAllIssues: (repoId) => api.get(`/issue/all/${repoId}`),
  getIssueById: (id) => api.get(`/issue/${id}`),
};

export default api;
