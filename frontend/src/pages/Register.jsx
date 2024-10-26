import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser({ name, email, password }));
    } else {
      toast.error('Passwords do not match');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      toast.success('Registered successfully!');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="register-page">
      <h1 className="text-2xl font-bold text-center mt-6">Register</h1>
      {loading && <div className="spinner">Loading...</div>}
      <form onSubmit={handleSubmit} className="register-form mt-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2" disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

