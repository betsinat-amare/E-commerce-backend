// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
            YourShop
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/orderHistory"
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/cart"
              className="relative text-gray-700 hover:text-indigo-600 font-medium"
            >
              Cart
              {/* Badge example for cart item count */}
              {/*<span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-1">3</span>*/}
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                "text-gray-700 hover:text-indigo-600 font-medium " +
                (isActive ? "border-b-2 border-indigo-600 pb-1" : "border-b-2 border-transparent")
              }
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 p-1 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Products
          </NavLink>
          <NavLink
            to="/orderHistory"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Orders
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Profile
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Cart
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
