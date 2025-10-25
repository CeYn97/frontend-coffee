export interface MenuItem {
  id: number;
  title: string;
  price: number;
}

export interface CreateMenuItemRequest {
  title: string;
  price: number;
}
