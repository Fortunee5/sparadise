import React from 'react';
import './About.css';
import useScrollReveal from '../hooks/useScrollReveal';
import useCounter from '../hooks/useCounter';

const StatCard = ({ target, label, suffix = "" }) => {
  const { count, elementRef } = useCounter(target);
  return (
    <div className="stat-card reveal bounce-reveal" ref={elementRef}>
      <h3 className="stat-number">{count}{suffix}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const About = () => {
  useScrollReveal();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image reveal bounce-reveal">
            <div className="img-wrapper">
              <img 
                src='https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxEME9M9cSy9FvfHvcx2gMPkp1H5Dj4YaKufPRsAyon8Tf' 
                alt="Spa Paradise Experience" 
              />
              <div className="img-badge">
                <span>EST 2026</span>
              </div>
            </div>
            <div className="img-decoration"></div>
          </div>
          
          <div className="about-content">
            <span className="section-subtitle reveal">Our Story</span>
            <h2 className="reveal shimmer-text">We Bring The Spa To Your Sanctuary</h2>
            <p className="reveal">
              SpaRadice Mobile Spa is a premier mobile wellness destination committed to bringing luxury and rejuvenation directly to your doorstep. Operating across Lagos, Abuja, and Port Harcourt, we redefine the spa experience by combining world-class treatments with the convenience of your own home, hotel, or office.
            </p>
            <p className="reveal" style={{ marginBottom: '40px' }}>
              Our therapists are highly trained professionals dedicated to your relaxation and well-being. Using only the finest natural products and advanced techniques, we ensure every session is a journey of sensory delight.
            </p>
            
            <div className="stats-grid">
              <StatCard target="500+" label="Clients Served" suffix="+" />
              <StatCard target="3" label="Cities" />
              <StatCard target="50+" label="Services" suffix="+" />
              <StatCard target="5" label="Star Rating" suffix="/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
