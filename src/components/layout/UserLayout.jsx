import React from 'react';
import UserNavbar from '../layout/Navbar';
import Footer from '../layout/Footer';

/**
 * UserLayout - Main layout wrapper for user-facing pages
 * Includes navbar and footer
 */
const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UserNavbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
