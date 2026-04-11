import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { Quote, Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const testimonials = [
  {
    name: "Ayodeji Olasunbo",
    city: "Lagos",
    text: "The best spa experience I've had in Nigeria. They arrived on time and the massage was heavenly. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dauda John",
    city: "Abuja",
    text: "Professional, clean, and extremely relaxing. Having this luxury in my living room is a game changer.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1616880859986-096ccc4dd26f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5pZ2VyaWFuJTIwZ3V5fGVufDB8fDB8fHww"
  },
  {
    name: "Eze Happiness",
    city: "Port Harcourt",
    text: "The facial treatments are top-notch. My skin has never looked better. Amazing attention to detail.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=200"
  }
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useScrollReveal();

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span className="section-subtitle reveal">Testimonials</span>
          <h2 className="reveal shimmer-text">Words from Our Clients</h2>
        </div>

        <div className="testimonial-slider reveal bounce-reveal">
          {testimonials.map((item, index) => (
            <div key={index} className={`testimonial-card glass ${index === active ? 'active' : ''}`}>
              <div className="testimonial-quote">
                <Quote size={40} className="quote-icon" />
              </div>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <div className="testimonial-client">
                <img src={item.image} alt={item.name} />
                <div className="client-info">
                  <h4>{item.name}</h4>
                  <span>{item.city}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === active ? 'active' : ''}`}
                onClick={() => setActive(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
