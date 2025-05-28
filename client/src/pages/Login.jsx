import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useJobPortal } from '../context/JobPortalContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const {
    googleAuthenticated,
    authenticateWithGoogle,
    setUserRole,
    isAuthenticated,
    user,
    selectedRole
  } = useJobPortal();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState('category'); // 'category' -> 'signup' -> 'dashboard'

  useEffect(() => {
    if (isAuthenticated && user) {
      setStep('dashboard');
      if (user.role === 'Student') {
        navigate('/student/dashboard');
      } else if (user.role === 'Recruiter') {
        navigate('/recruiter/dashboard');
      } else if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleCategorySelection = (role) => {
    setUserRole(role);
    setStep('signup');
  };

  const handleGoogleLogin = () => {
    if (!selectedRole) {
      console.error('Please select a role first');
      return;
    }
    authenticateWithGoogle();
  };

  const handleBack = () => {
    setStep('category');
  };

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Welcome to JobQuest!
      </h1>
      <p className="text-center text-gray-600">
        Choose how you'd like to proceed
      </p>
      <div className="grid gap-4">
        <button
          onClick={() => handleCategorySelection('Student')}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
        >
          <h3 className="font-semibold text-lg">Student</h3>
          <p className="text-gray-600">Looking for job opportunities and career growth</p>
        </button>
        <button
          onClick={() => handleCategorySelection('Recruiter')}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
        >
          <h3 className="font-semibold text-lg">Recruiter</h3>
          <p className="text-gray-600">Post jobs and find the best talent</p>
        </button>
        <button
          onClick={() => handleCategorySelection('Admin')}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
        >
          <h3 className="font-semibold text-lg">Admin</h3>
          <p className="text-gray-600">Manage the platform and users</p>
        </button>
      </div>
    </div>
  );

  const renderSignup = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Sign up as {selectedRole}
      </h1>
      <p className="text-center text-gray-600">
        Create your account to get started
      </p>
      <button
        onClick={handleGoogleLogin}
        disabled={!selectedRole}
        className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          !selectedRole ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <img
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="Google icon"
          className="mr-2"
        />
        Continue with Google
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          {step === 'category' ? renderCategorySelection() : renderSignup()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
