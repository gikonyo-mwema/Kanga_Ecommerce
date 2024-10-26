import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, LogOut } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';  // <-- Corrected import

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // Routes where the Navbar should not be displayed
  const hideNavbarRoutes = ['/login', '/register'];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());  // <-- Corrected action
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Kanga Store</Link>
        
        <ul className="flex space-x-4 text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-black cursor-pointer">
                  <AvatarFallback className="bg-black text-white font-extrabold">
                    {user?.userName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems?.length || 0}
            </span>
            <span className="sr-only">View cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

