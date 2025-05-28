import { Link, useNavigate } from 'react-router-dom';
import { useJobPortal } from '../context/JobPortalContext.jsx';
import { useState } from 'react';
import React from 'react';

function Navbar() {
  const { isAuthenticated, user, logout } = useJobPortal();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white py-2 md:py-10 lg:py-5 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-wide transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <span className="text-white">Job</span>
          <span className="text-green-300">Quest</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            to="/"
            className="text-gray-200 text-lg font-medium hover:text-white transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-200 text-lg font-medium hover:text-white transform hover:scale-105 transition duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 text-lg font-medium hover:text-white transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Contact Us
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg font-medium hidden lg:inline">
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-indigo-700 px-5 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger/X icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200 focus:outline-none transition duration-300 ease-in-out"
          >
            <svg
              className="w-8 h-8" // Increased size for better touch
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-blue-900 to-indigo-950 py-4 px-6 shadow-xl rounded-b-lg animate-slide-down"
          onClick={toggleMobileMenu} // Close menu when any link is clicked
        >
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="block py-3 text-lg font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition duration-300 rounded-md px-4"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-3 text-lg font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition duration-300 rounded-md px-4"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-3 text-lg font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition duration-300 rounded-md px-4"
            >
              Contact Us
            </Link>
            {isAuthenticated ? (
              <>
                <div className="py-3 text-lg font-medium text-white px-4">
                  Welcome, {user.name} ({user.role})
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full text-left bg-white text-indigo-700 px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;