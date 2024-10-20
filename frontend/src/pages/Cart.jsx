import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItems';

const Cart = () => {
  const cart = useSelector(state => state.cart); // Getting cart items from Redux store

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="text-2xl font-bold text-center mt-6">Shopping Cart</h1>

      <div className="cart-items mt-8">
        {cart.items.length > 0 ? (
          cart.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="total-price text-right mt-6">
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
          <button className="bg-blue-500 text-white py-2 px-4 mt-4">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

