import axios from 'axios';
import type { MenuItem, CreateMenuItemRequest } from '../types/menu';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuApi = {
  getAllMenuItems: async (): Promise<MenuItem[]> => {
    const response = await api.get('/menu');
    return response.data;
  },

  createMenuItem: async (item: CreateMenuItemRequest): Promise<MenuItem> => {
    const response = await api.post('/menu', item);
    return response.data;
  },
};

export default api;
