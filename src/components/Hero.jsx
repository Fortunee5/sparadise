import React, { useState, useEffect } from 'react';
import './Hero.css';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1920",
      alt: "White lady in luxury spa"
    },
    {
      image: "https://images.unsplash.com/photo-1596178065887-113861dffdfb?auto=format&fit=crop&q=80&w=1920",
      alt: "African American lady relaxing"
    },
    {
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1920",
      alt: "Nigerian lady getting treatment"
    },
    {
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1920",
      alt: "Nigerian man in spa session"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useScrollReveal();

  return (
    <section id="home" className="hero">
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="hero-content container">
        <div className="hero-badge reveal">
          <span className="badge-line"></span>
          <span>Available 7 Days a Week</span>
          <span className="badge-line"></span>
        </div>
        
        <h1 className="reveal bounce-reveal shimmer-text">
          Luxury Comes To You
        </h1>
        
        <p className="reveal bounce-reveal">
          Premium Mobile Spa Services in Lagos, Abuja & Port Harcourt
        </p>
        
        <div className="hero-btns reveal bounce-reveal">
          <a href="#booking" className="btn btn-primary">Book a Session</a>
          <a href="#services" className="btn btn-outline">Explore Services</a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
