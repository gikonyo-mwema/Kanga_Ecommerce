import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory, updateOrderStatus } from '../redux/slices/orderSlice';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  const handleStatusChange = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status }));
    setStatus('');
  };

  return (
    <div className="manage-orders">
      <h1 className="text-2xl font-bold text-center mt-6">Manage Orders</h1>
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

            <div className="status-update mt-4">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded-md">
                <option value="">Update Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={() => handleStatusChange(order._id)} className="bg-blue-500 text-white py-1 px-4 ml-2 rounded-md">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;


