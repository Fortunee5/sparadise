import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import GalleryAndFAQ from './components/GalleryAndFAQ';
import BookingForm from './components/BookingForm';
import FooterAndWidgets from './components/FooterAndWidgets';

const MainSite = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="main-site">
      <div 
        className="cursor-glow" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <Navbar />
      <Hero />
      <div style={{ marginBottom: '100px' }}></div> {/* Extra space before About as requested */}
      <About />
      <Services />
      <HowItWorks />
      <Testimonials />
      <GalleryAndFAQ />
      <BookingForm />
      <FooterAndWidgets />
    </div>
  );
};

export default MainSite;
