import type { MenuItem } from './menu';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface DeliveryAddress {
  id: number;
  street: string;
  houseNumber: string;
}

export interface CreateOrderRequest {
  name: string;
  phone: string;
  addressId: number;
  items: { id: number; quantity: number }[];
  total: number;
}

