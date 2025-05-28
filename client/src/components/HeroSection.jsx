import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-purple-800 text-white py-20 md:py-32 lg:py-40 shadow-2xl">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-overlay animate-pulse-slow-2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
          Unlock Your <span className="text-yellow-300">Dream Career</span> with <span className="text-green-300">JobQuest</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-200">
          A dynamic portal where students earn points by excelling in career tasks, recruiters discover top talent, and admins manage it all seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-5 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login?role=student"
            className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in-up delay-400"
          >
            Join as a Student
          </Link>
          <Link
            to="/login?role=recruiter"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-purple-700 transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in-up delay-500"
          >
            Hire as a Recruiter
          </Link>
          <Link
            to="/login?role=admin"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-purple-700 transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in-up delay-600"
          >
            Manage as an Admin
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;