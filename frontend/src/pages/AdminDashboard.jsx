import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Redux hook

const AdminDashboard = () => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Fetch the user from Redux state

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  useEffect(() => {
    // Redirect if the user is not an admin
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirect non-admins to the homepage or login
    }
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold text-center mt-6">Admin Dashboard</h1>

      <div className="admin-actions grid grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-100 p-6 rounded text-center">
          <h2 className="text-xl font-bold">Manage Products</h2>
          <Link to="/admin/manage-products">
            <button className="bg-blue-500 text-white py-2 px-4 mt-4">Go</button>
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded text-center">
          <h2 className="text-xl font-bold">Manage Orders</h2>
          <Link to="/admin/manage-orders">
            <button className="bg-blue-500 text-white py-2 px-4 mt-4">Go</button>
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded text-center">
          <h2 className="text-xl font-bold">Manage Users</h2>
          <Link to="/admin/manage-users">
            <button className="bg-blue-500 text-white py-2 px-4 mt-4">Go</button>
          </Link>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center">Upload Product Image</h2>
        <ImageUpload onUpload={handleImageUpload} />
        {imageUrl && (
          <div className="mt-4 text-center">
            <img src={imageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
            <p className="mt-2">Uploaded Image Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


