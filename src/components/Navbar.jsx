import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Phone, MessageSquare } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          Spa<span>Radise</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="/#home" className="nav-link">Home</a>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#services" className="nav-link">Services</a>
          <a href="/#gallery" className="nav-link">Gallery</a>
          <a href="/#faq" className="nav-link">FAQ</a>
          <a href="/#booking" className="btn btn-primary nav-btn">Book Now</a>
        </div>

        <button className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="promo-banner-mobile">
        <span>Available 7 Days a Week</span>
      </div>
    </nav>
  );
};

export default Navbar;
