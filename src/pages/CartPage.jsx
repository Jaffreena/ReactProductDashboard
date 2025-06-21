// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0)
    return <div className="text-center mt-5">🛒 Cart is empty</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src={item.thumbnail}
                className="img-fluid rounded-start"
                alt={item.title}
              />
            </div>
            <div className="col-md-10">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Quantity: {item.qty}</p>
                  <p className="card-text fw-bold">₹ {item.price * item.qty}</p>
                </div>
                <button
                  className="btn btn-danger btn-sm h-25"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h4 className="text-end mt-3">Total: ₹ {total.toFixed(2)}</h4>
    </div>
  );
};

export default CartPage;
