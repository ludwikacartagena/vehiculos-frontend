import axios from 'axios';

const API_URL = 'https://vehiculos-backend-production.up.railway.app/api';

export const vehiculosAPI = {
  getAll: () => axios.get(`${API_URL}/vehiculos`),
  getById: (id) => axios.get(`${API_URL}/vehiculos/${id}`),
  create: (data) => axios.post(`${API_URL}/vehiculos`, data),
  update: (id, data) => axios.put(`${API_URL}/vehiculos/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/vehiculos/${id}`)
};

export const registrosAPI = {
  getAll: (params) => axios.get(`${API_URL}/registros`, { params }),
  getById: (id) => axios.get(`${API_URL}/registros/${id}`),
  create: (data) => axios.post(`${API_URL}/registros`, data),
  update: (id, data) => axios.put(`${API_URL}/registros/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/registros/${id}`)
};
