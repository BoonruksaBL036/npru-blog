import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { userInfo, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About NPRU Blog</h3>
            <p className="text-sm leading-relaxed">
              A modern blogging platform for sharing knowledge, experiences, and insights. 
              Connect with readers and build your audience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-white transition">
                  Create Post
                </Link>
              </li>
              {!userInfo ? (
                <>
                  <li>
                    <Link to="/login" className="hover:text-white transition">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-white transition">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 9.964 9.964 0 01-2.866.36 4.993 4.993 0 002.19-2.75c-.969.575-2.039.937-3.181.937a4.993 4.993 0 00-8.608 4.55A14.177 14.177 0 011.671 3.149a4.993 4.993 0 001.547 6.659 4.976 4.976 0 01-2.268-.567v.063a4.996 4.996 0 003.998 4.897 4.996 4.996 0 01-2.212.084 4.997 4.997 0 004.664 3.479A10.005 10.005 0 010 19.54a13.976 13.976 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 17.789h-1.411v-5.694a1.889 1.889 0 00-1.667-1.944c-1.028 0-1.856.917-1.856 2.044v5.594h-1.411V9.35h1.357v.749h.02c.264-.497.856-1.081 1.744-1.081 2.058 0 2.539 1.394 2.539 3.527v5.244zM5.487 8.556a.823.823 0 110-1.646.823.823 0 010 1.646zm.722 9.233H4.765V9.35h1.444v8.439zm12.875-16.604c-6.937 0-12.557 5.621-12.557 12.557s5.62 12.557 12.557 12.557 12.557-5.621 12.557-12.557-5.62-12.557-12.557-12.557z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-8" />

        {/* Copyright Section */}
        <div className="flex justify-center">
          <p className="text-sm">
            &copy; {currentYear} NPRU Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer