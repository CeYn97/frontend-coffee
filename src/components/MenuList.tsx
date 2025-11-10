import React, { useState, useEffect } from "react";
import type { MenuItem as MenuItemType } from "../types/menu";
import { menuApi, vkApi } from "../services/api";
import MenuItem from "./MenuItem";
import "./MenuList.css";

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const [items, photos] = await Promise.all([
          menuApi.getAllMenuItems(),
          vkApi.getPhotos(),
        ]);

        const itemsWithPhotos = items.map((item, index) => ({
          ...item,
          imageUrl: photos[index] || item.imageUrl,
        }));

        setMenuItems(itemsWithPhotos);
        setError(null);
      } catch (err) {
        setError(
          "Ошибка загрузки меню. Проверьте, что бекенд запущен на порту 3000."
        );
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Загрузка меню...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="menu-list">
      <div className="menu-grid">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
