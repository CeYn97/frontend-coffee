import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { deliveryApi, ordersApi } from '../services/api';
import type { DeliveryAddress } from '../types/cart';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressId, setAddressId] = useState<number | ''>('');
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await deliveryApi.getAddresses();
        setAddresses(data);
        if (data.length > 0) {
          setAddressId(data[0].id);
        }
      } catch (err) {
        setError('Ошибка загрузки адресов. Проверьте, что бекенд запущен.');
        console.error('Error fetching addresses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !addressId) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (cartItems.length === 0) {
      setError('Корзина пуста');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const orderData = {
        name: name.trim(),
        phone: phone.trim(),
        addressId: addressId as number,
        items: cartItems.map((cartItem) => ({
          id: cartItem.item.id,
          quantity: cartItem.quantity,
        })),
        total: getTotalPrice(),
      };

      await ordersApi.createOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Ошибка при создании заказа. Попробуйте еще раз.');
      console.error('Error creating order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Загрузка адресов...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">Оформление заказа</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={submitting}
              placeholder="+79001234567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Адрес доставки
            </label>
            <select
              id="address"
              className="form-select"
              value={addressId}
              onChange={(e) => setAddressId(Number(e.target.value))}
              required
              disabled={submitting}
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.street}, {address.houseNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="order-summary">
            <h3 className="summary-title">Ваш заказ</h3>
            <div className="summary-items">
              {cartItems.map((cartItem) => (
                <div key={cartItem.item.id} className="summary-item">
                  <span className="summary-item-name">
                    {cartItem.item.title} × {cartItem.quantity}
                  </span>
                  <span className="summary-item-price">
                    {(cartItem.item.price * cartItem.quantity).toFixed(2)} ₽
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span className="total-label">Итого:</span>
              <span className="total-value">{getTotalPrice().toFixed(2)} ₽</span>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={submitting || cartItems.length === 0}
          >
            {submitting ? 'Обработка...' : 'Оплатить заказ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

