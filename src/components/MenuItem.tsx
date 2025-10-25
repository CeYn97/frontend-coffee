import React from 'react';
import type { MenuItem as MenuItemType } from '../types/menu';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.title}</h3>
        <p className="menu-item-price">{item.price} ₽</p>
      </div>
    </div>
  );
};

export default MenuItem;
