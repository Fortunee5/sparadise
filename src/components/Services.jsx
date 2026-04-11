import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import useScrollReveal from '../hooks/useScrollReveal';

const servicesData = [
  {
    category: 'Massage',
    items: [
      { id: 1, name: 'Swedish Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600', desc: 'A gentle full-body massage to promote relaxation and ease tension.' },
      { id: 2, name: 'Deep Tissue Massage', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600', desc: 'Therapeutic massage targeting deep muscle layers and chronic pain.' },
      { id: 3, name: 'Hot Stone Therapy', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=600', desc: 'Warm basalt stones placed on key points to melt away stress.' }
    ]
  },
  {
    category: 'Facial',
    items: [
      { id: 4, name: 'Luxury Hydrafacial', image: 'https://images.unsplash.com/photo-1702312721918-62235a0b77d2?w=600&auto=format&fit=crop&q=60', desc: 'Advanced resurfacing treatment for glowing, hydrated skin.' },
      { id: 5, name: 'Anti-Aging Facial', image: 'https://plus.unsplash.com/premium_photo-1661255395799-a300794397fb?w=600&auto=format&fit=crop&q=60', desc: 'Targets fine lines and wrinkles for a youthful complexion.' },
      { id: 6, name: 'Facial Glow', image: 'https://plus.unsplash.com/premium_photo-1661255395799-a300794397fb?w=600&auto=format&fit=crop&q=60', desc: 'Brightening treatment for radiant, luminous skin.' }
    ]
  },
  {
    category: 'Body Treatments',
    items: [
      { id: 7, name: 'Coffee Body Scrub', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600', desc: 'Exfoliating treatment to smooth and firm your skin.' },
      { id: 8, name: 'Seaweed Body Wrap', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600', desc: 'Detoxifying wrap for ultimate mineral absorption and hydration.' },
      { id: 9, name: 'Thermal Body Wrap', image: 'https://images.unsplash.com/photo-1570174006382-148305ce4972?w=600&auto=format&fit=crop&q=60', desc: 'Detoxifying wrap for ultimate mineral absorption and hydration.' }
    ]
  },
  {
    category: 'Nail Care',
    items: [
      { id: 10, name: 'Luxury Pedicure', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600', desc: 'Comprehensive foot care including exfoliation and massage.' },
      { id: 11, name: 'Gel Manicure', image: 'https://images.unsplash.com/photo-1655720360101-59ae4e315572?w=600&auto=format&fit=crop&q=60', desc: 'Long-lasting gel polish with professional nail grooming.' },
      { id: 12, name: 'Classic Manicure', image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&auto=format&fit=crop&q=60', desc: 'Classic nail shaping and polish for perfectly groomed hands.' }
    ]
  },
  {
    category: 'Waxing',
    items: [
      { id: 13, name: 'Full Body Wax', image: 'https://images.unsplash.com/photo-1677682692998-7db8c3245bc9?w=600&auto=format&fit=crop&q=60', desc: 'Professional hair removal from head to toe for smooth skin.' },
      { id: 14, name: 'Leg Wax', image: 'https://images.unsplash.com/photo-1677682692989-0e54aa104350?w=600&auto=format&fit=crop&q=60', desc: 'Professional hair removal for silky smooth legs.' },
      { id: 15, name: 'Brow & Face Wax', image: 'https://images.unsplash.com/photo-1677682692306-c4f26c4bf66c?w=600&auto=format&fit=crop&q=60', desc: 'Precise facial waxing for perfectly shaped brows and smooth skin.' }
    ]
  },
  {
    category: 'Packages',
    items: [
      { id: 16, name: 'Royal Spa Day', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=600', desc: 'The ultimate luxury: Massage + Facial + Body Scrub + Pedicure.' },
      { id: 17, name: 'Couples Retreat', image: 'https://plus.unsplash.com/premium_photo-1723867490491-10519f8ed969?w=600&auto=format&fit=crop&q=60', desc: 'A shared luxury experience designed for two.' },
      { id: 18, name: 'Gentleman\'s Package', image: 'https://images.unsplash.com/photo-1611169035510-f9af52e6dbe2?w=600&auto=format&fit=crop&q=60', desc: 'Tailored spa treatments crafted for the modern man.' }
    ]
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('Massage');
  const [animating, setAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState('Massage');
  const gridRef = useRef(null);
  useScrollReveal();

  const handleTabChange = (category) => {
    if (category === activeTab || animating) return;
    setAnimating(true);

    // Fade out
    if (gridRef.current) {
      gridRef.current.classList.add('fade-out');
    }

    setTimeout(() => {
      setDisplayedTab(category);
      setActiveTab(category);

      // Fade in
      if (gridRef.current) {
        gridRef.current.classList.remove('fade-out');
        gridRef.current.classList.add('fade-in');
      }

      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.classList.remove('fade-in');
        }
        setAnimating(false);
      }, 350);
    }, 300);
  };

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="services-header text-center">
          <span className="section-subtitle reveal">Our Offerings</span>
          <h2 className="reveal shimmer-text">Our Signature Services</h2>
          <p className="reveal" style={{ maxWidth: '600px', margin: '0 auto 50px auto' }}>
            Choose from our wide range of professional spa treatments, all delivered in the comfort of your sanctuary.
          </p>
        </div>

        <div className="tabs-container reveal">
          <div className="tabs">
            {servicesData.map((cat) => (
              <button
                key={cat.category}
                className={`tab-btn ${activeTab === cat.category ? 'active' : ''}`}
                onClick={() => handleTabChange(cat.category)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        <div className="services-grid" ref={gridRef}>
          {servicesData.find(c => c.category === displayedTab).items.map((service, index) => (
            <div
              key={service.id}
              className="service-card glass reveal bounce-reveal"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.name} loading="lazy" />
                <div className="service-tag">{service.duration}</div>
              </div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <div className="service-footer">
                  <span className="price">{service.price}</span>
                  <a href="#booking" className="btn btn-outline small">Book This Service</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
