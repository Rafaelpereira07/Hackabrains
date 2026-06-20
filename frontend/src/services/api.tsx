import axios from 'axios';

// Use a relative baseURL so the frontend talks to the local backend (configured in /api/*)
export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Helper to attach token from localStorage (called after login)
export function setAuthToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

// Auth related calls
export const authService = {
  login: (payload: { email: string; password: string }) => api.post('/auth/login', payload),
  register: (payload: any) => api.post('/auth/register', payload),
};

export const dashboardService = {
  getDoctorDashboard: () => api.get('/dashboards/doctor'),
  getPatientDashboard: () => api.get('/dashboards/patient'),
  getAdminDashboard: () => api.get('/dashboards/admin/users'),
};

export const reportService = {
  createReport: (payload: any) => api.post('/reports', payload),
};

export const patientService = {
  // Endpoints below are wrappers — backend may not expose all of them yet
  getPatientHistory: (id: string) => api.get(`/patients/${id}/history`),
  submitConsultation: (id: string, data: any) => api.post(`/patients/${id}/consultation`, data),
};