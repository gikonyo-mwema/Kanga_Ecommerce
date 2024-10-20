import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 shadow-sm">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2"/>
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </Link>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

