export interface MenuItem {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
}

export interface CreateMenuItemRequest {
  title: string;
  price: number;
}
