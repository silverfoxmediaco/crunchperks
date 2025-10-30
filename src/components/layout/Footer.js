import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-heading text-white mb-4">
              CRUNCH PERKS
            </h2>
            <p className="text-gray-300 mb-4">
              Connect your local business with health-conscious gym members.
              Affordable, targeted advertising that drives real results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-gray-300 hover:text-orange transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/#how-it-works"
                  className="text-gray-300 hover:text-orange transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-orange transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>support@crunchperks.com</li>
              <li>1-800-CRUNCH-1</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Crunch Perks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
