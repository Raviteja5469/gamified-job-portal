import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JobQuest</h3>
            <p className="text-sm">
              Empowering students and recruiters through a gamified job search experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/about" className="hover:text-blue-400">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: support@jobquest.com</p>
            <p className="text-sm">Phone: +91 9216517004</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © 2025 JobQuest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



export default Footer;
