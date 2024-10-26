import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice'; // Action to log in

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(''); // New state for form validation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    if (!email || !password) {
      setFormError('Please fill in both fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormError('');
      dispatch(loginUser({ email, password }));
    }
  };

  // Redirect to home page on successful login
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account? 
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
      {loading && <p>Loading...</p>}
      {formError && <p className="text-red-500">{formError}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



