const OrderCard = ({ order }) => {
  return (
    <div className="border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
      <p className="text-gray-600">Total: ${order.total}</p>
      <p className="text-gray-600">Status: {order.status}</p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">View Details</button>
    </div>
  );
};

export default OrderCard;

