import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or need support? Reach out to us, and we’ll get back to you as soon as possible.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form (Non-functional UI) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your message..."
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              We’re here to help! Contact us via email or phone.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@jobquest.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 JobQuest Lane, Career City, 12345</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactUs;
