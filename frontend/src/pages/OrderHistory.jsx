import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../redux/slices/orderSlice';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div className="order-history">
      <h1 className="text-2xl font-bold text-center mt-6">Order History</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="orders-list mt-8">
        {orders.map((order) => (
          <div key={order._id} className="p-4 bg-gray-100 rounded-md mb-4">
            <h2 className="text-xl font-bold">Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="order-items mt-4">
              <h3 className="font-bold">Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
