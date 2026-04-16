import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FooterAndWidgets.css';
import { Instagram, Facebook, Phone, MessageSquare, ArrowUp, Mail, MapPin } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const FooterAndWidgets = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useScrollReveal();

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      <footer className="footer section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand reveal">
              <Link to="/" className="logo">Spa<span>Radise</span></Link>
              <p>Premium mobile spa services bringing luxury and tranquility to your doorstep in Lagos, Abuja, and Port Harcourt.</p>
              <div className="social-links">
  <a href="https://www.instagram.com/sparadice001" target="_blank" rel="noreferrer"><Instagram size={20} /></a>
  <a href="https://web.facebook.com/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=61559988459009&sk=about" target="_blank" rel="noreferrer"><Facebook size={20} /></a>
  <a href="https://www.tiktok.com/@sparadice3?_r=1&_t=ZS-95VsdkLk9rw" target="_blank" rel="noreferrer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  </a>
</div>
            </div>

            <div className="footer-links reveal">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#booking">Book Now</a></li>
              </ul>
            </div>

            <div className="footer-contact reveal">
              <h3>Contact Info</h3>
              <ul>
                <li><Phone size={18} /> +234 814 249 5552</li>
                <li><Mail size={18} /> info@sparadice.com</li>
                <li><MapPin size={18} /> Ikoyi Nigeria</li>
                <li><MessageSquare size={18} /> 7 Days a Week, 24hours</li>
              </ul>
            </div>

            <div className="footer-cities reveal">
              <h3>Our Cities</h3>
              <div className="city-badges">
  <span className="city-badge">Lagos</span>
  <span className="city-badge">
    <a 
      href="https://amoschegwe.netlify.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: '#FFFFFF', textDecoration: 'none' }}
         >
        Abuja
        </a>
        </span>
        <span className="city-badge">Port Harcourt</span>
          </div>
          </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 SpaRadice Mobile Spa. <Link to="/admin/login">All rights reserved.</Link></p>
          </div>
        </div>
      </footer>

      {/* Floating Widgets */}
      <div className={`scroll-progress-widget ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
        <svg width="60" height="60">
          <circle 
            className="progress-bg" 
            cx="30" cy="30" r={radius} 
            strokeWidth="3" fill="none" 
          />
          <circle 
            className="progress-bar" 
            cx="30" cy="30" r={radius} 
            strokeWidth="3" fill="none" 
            style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
          />
        </svg>
        <ArrowUp className="arrow-icon" size={24} />
      </div>

      <a href="https://wa.me/2348142495552" target="_blank" rel="noopener noreferrer" className="whatsapp-floating">
        <MessageSquare size={28} />
        <span className="whatsapp-text">Chat with us</span>
      </a>
    </>
  );
};

export default FooterAndWidgets;
