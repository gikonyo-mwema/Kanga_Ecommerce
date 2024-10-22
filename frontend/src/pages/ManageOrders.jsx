import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../redux/slices/orderSlice';
import OrderCard from '../components/OrderCard';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Manage Orders</h1>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onUpdateStatus={(status) => handleUpdateStatus(order._id, status)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;

