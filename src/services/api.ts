import axios from 'axios';
import type { MenuItem, CreateMenuItemRequest } from '../types/menu';
import type { DeliveryAddress, CreateOrderRequest } from '../types/cart';

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

export const deliveryApi = {
  getAddresses: async (): Promise<DeliveryAddress[]> => {
    const response = await api.get('/delivery-addresses');
    return response.data;
  },
};

export const ordersApi = {
  createOrder: async (order: CreateOrderRequest): Promise<{ success: boolean; orderId: number }> => {
    const response = await api.post('/orders', order);
    return response.data;
  },
};

export const vkApi = {
  getPhotos: async (): Promise<string[]> => {
    try {
      const response = await api.get('/vk/photos');
      return response.data.photos || [];
    } catch (error) {
      console.warn('VK API недоступен:', error);
      return [];
    }
  },
};

export default api;
