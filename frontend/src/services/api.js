import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => api.post('/users/login', data);
export const register = (data) => api.post('/users/register', data);
export const getProgress = () => api.get('/progress');
export const updateProgress = (data) => api.put('/progress', data);
export const getFinance = () => api.get('/finance');
export const updateFinance = (data) => api.put('/finance', data);
export const getProperties = () => api.get('/properties');
export const addProperty = (data) => api.post('/properties', data);
export const updateProperty = (data) => api.put('/properties', data);
export const getDocuments = () => api.get('/documents');
export const uploadDocument = (formData) => api.post('/documents', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateDocument = (data) => api.put('/documents', data);
export const getContacts = () => api.get('/contacts');
export const addContact = (data) => api.post('/contacts', data);
export const updateContact = (data) => api.put('/contacts', data);
export const getAppointments = () => api.get('/appointments');
export const addAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (data) => api.put('/appointments', data);
export const generateReport = () => api.get('/reports', { responseType: 'blob' });