import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.seubackend.com/v1',
  timeout: 10000,
});

// Exemplo de chamadas simuladas
export const patientService = {
  getPatientHistory: (id: string) => api.get(`/patients/${id}/history`),
  submitConsultation: (id: string, data: any) => api.post(`/patients/${id}/consultation`, data),
  generateAIReport: (id: string, consultationId: string) => 
    api.post(`/patients/${id}/consultation/${consultationId}/generate-ai-report`),
};