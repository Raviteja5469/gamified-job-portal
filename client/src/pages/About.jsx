import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import React from 'react';

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            About JobQuest
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JobQuest is a dynamic job portal designed to bridge the gap between students, recruiters, and administrators. Our mission is to make the job search process engaging, rewarding, and efficient for everyone involved.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            We aim to empower students by gamifying the job search process, help recruiters find top talent effortlessly, and provide admins with powerful tools to manage the platform seamlessly.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Students</h3>
            <p className="text-gray-600">
              Earn points, complete tasks, and unlock opportunities to land your dream job.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Recruiters</h3>
            <p className="text-gray-600">
              Post jobs, review applications, and discover top talent with ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Admins</h3>
            <p className="text-gray-600">
              Manage users, jobs, and platform activity with comprehensive tools.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;