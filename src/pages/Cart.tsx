import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h2 className="cart-title">Корзина</h2>
          <div className="cart-empty">
            <p>Ваша корзина пуста</p>
            <button className="back-to-menu-button" onClick={() => navigate('/')}>
              Вернуться к меню
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Корзина</h2>
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <div key={cartItem.item.id} className="cart-item">
              <div className="cart-item-info">
                <h3 className="cart-item-title">{cartItem.item.title}</h3>
                <p className="cart-item-price">{cartItem.item.price} ₽</p>
              </div>
              <div className="cart-item-controls">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(cartItem.item.id, cartItem.quantity - 1)}
                >
                  −
                </button>
                <span className="quantity-value">{cartItem.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(cartItem.item.id, cartItem.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(cartItem.item.id)}
                >
                  Удалить
                </button>
              </div>
              <div className="cart-item-total">
                {(cartItem.item.price * cartItem.quantity).toFixed(2)} ₽
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span className="total-label">Итого:</span>
            <span className="total-value">{getTotalPrice().toFixed(2)} ₽</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Сформировать заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

