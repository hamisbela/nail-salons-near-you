import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pink-900 text-white mt-12 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="block">Nail Salons</span>
              <span className="block">NearYou.com</span>
            </h3>
            <p className="text-pink-200">Find the best nail salons, nail spas, and nail technicians in your area.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-pink-200 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-pink-200 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-pink-200 hover:text-white">Contact</Link></li>
              <li><Link to="/add-a-listing" className="text-pink-200 hover:text-white">Add Listing</Link></li>
              <li><a href="/sitemap.html" className="text-pink-200 hover:text-white">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Popular States</h3>
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                <li><a href="/states/california/" className="text-pink-200 hover:text-white">California</a></li>
                <li><a href="/states/new-york/" className="text-pink-200 hover:text-white">New York</a></li>
                <li><a href="/states/florida/" className="text-pink-200 hover:text-white">Florida</a></li>
                <li><a href="/states/texas/" className="text-pink-200 hover:text-white">Texas</a></li>
                <li><a href="/states/illinois/" className="text-pink-200 hover:text-white">Illinois</a></li>
                <li><a href="/states/pennsylvania/" className="text-pink-200 hover:text-white">Pennsylvania</a></li>
                <li><a href="/states/massachusetts/" className="text-pink-200 hover:text-white">Massachusetts</a></li>
                <li><a href="/states/washington/" className="text-pink-200 hover:text-white">Washington</a></li>
              </ul>
              <ul className="space-y-2">
                <li><a href="/states/ohio/" className="text-pink-200 hover:text-white">Ohio</a></li>
                <li><a href="/states/georgia/" className="text-pink-200 hover:text-white">Georgia</a></li>
                <li><a href="/states/michigan/" className="text-pink-200 hover:text-white">Michigan</a></li>
                <li><a href="/states/north-carolina/" className="text-pink-200 hover:text-white">North Carolina</a></li>
                <li><a href="/states/new-jersey/" className="text-pink-200 hover:text-white">New Jersey</a></li>
                <li><a href="/states/arizona/" className="text-pink-200 hover:text-white">Arizona</a></li>
                <li><a href="/states/colorado/" className="text-pink-200 hover:text-white">Colorado</a></li>
                <li><a href="/states/maryland/" className="text-pink-200 hover:text-white">Maryland</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Cities</h3>
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                <li><a href="/cities/new-york/" className="text-pink-200 hover:text-white">New York</a></li>
                <li><a href="/cities/los-angeles/" className="text-pink-200 hover:text-white">Los Angeles</a></li>
                <li><a href="/cities/chicago/" className="text-pink-200 hover:text-white">Chicago</a></li>
                <li><a href="/cities/houston/" className="text-pink-200 hover:text-white">Houston</a></li>
                <li><a href="/cities/phoenix/" className="text-pink-200 hover:text-white">Phoenix</a></li>
                <li><a href="/cities/philadelphia/" className="text-pink-200 hover:text-white">Philadelphia</a></li>
              </ul>
              <ul className="space-y-2">
                <li><a href="/cities/san-antonio/" className="text-pink-200 hover:text-white">San Antonio</a></li>
                <li><a href="/cities/san-diego/" className="text-pink-200 hover:text-white">San Diego</a></li>
                <li><a href="/cities/dallas/" className="text-pink-200 hover:text-white">Dallas</a></li>
                <li><a href="/cities/san-jose/" className="text-pink-200 hover:text-white">San Jose</a></li>
                <li><a href="/cities/austin/" className="text-pink-200 hover:text-white">Austin</a></li>
                <li><a href="/cities/jacksonville/" className="text-pink-200 hover:text-white">Jacksonville</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-pink-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex space-x-6 text-2xl justify-center md:justify-start">
            <a href="#" className="text-pink-200 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-pink-200 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-pink-200 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-pink-200 hover:text-white"><i className="fab fa-linkedin"></i></a>
          </div>
          <div className="text-center md:text-right text-pink-200">
            <p>&copy; {currentYear} Nail Salons Near You. All rights reserved.</p>
            <p className="mt-1 text-sm">
              <a href="/sitemap.html" className="hover:text-white">Sitemap</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;