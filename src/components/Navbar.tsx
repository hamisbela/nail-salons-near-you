import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paintbrush, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 bg-pink-900 text-white transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold flex items-center">
              <Paintbrush className="mr-2" size={24} />
              <span className="hidden md:inline">NailSalonNearYou.com</span>
              <span className="md:hidden">Nail Salons</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className={`hover:text-pink-200 ${location.pathname === '/' ? 'text-white font-semibold' : 'text-pink-100'}`}>Home</Link>
            <Link to="/about" className={`hover:text-pink-200 ${location.pathname === '/about' ? 'text-white font-semibold' : 'text-pink-100'}`}>About</Link>
            <Link to="/contact" className={`hover:text-pink-200 ${location.pathname === '/contact' ? 'text-white font-semibold' : 'text-pink-100'}`}>Contact</Link>
            <Link to="/add-a-listing" className="bg-white text-pink-900 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors font-medium">
              Add Listing
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-xl p-2" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        
        {/* Mobile menu - with animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 flex flex-col">
            <Link to="/" className="hover:text-pink-200 py-1">Home</Link>
            <Link to="/about" className="hover:text-pink-200 py-1">About</Link>
            <Link to="/contact" className="hover:text-pink-200 py-1">Contact</Link>
            <Link to="/add-a-listing" className="bg-white text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-100 transition-colors text-center font-medium mt-2">
              Add Listing
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;