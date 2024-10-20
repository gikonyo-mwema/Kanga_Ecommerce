const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4"/>
        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        className="ml-4 bg-red-500 text-white py-1 px-4 rounded"
        onClick={() => onRemove(item._id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

