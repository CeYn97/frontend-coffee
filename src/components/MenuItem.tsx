import React from 'react';
import type { MenuItem as MenuItemType } from '../types/menu';
import { useCart } from '../contexts/CartContext';
import './MenuItem.css';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="menu-item">
      {item.imageUrl && (
        <div className="menu-item-image-container">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="menu-item-image"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.title}</h3>
        <p className="menu-item-price">{item.price} ₽</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
