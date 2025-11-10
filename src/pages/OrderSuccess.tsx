import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Заказ успешно оформлен!</h2>
        <p className="success-message">
          Ваш заказ отправлен в обработку. Мы свяжемся с вами в ближайшее время.
        </p>
        <button className="back-to-menu-button" onClick={() => navigate('/')}>
          Вернуться к меню
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;

