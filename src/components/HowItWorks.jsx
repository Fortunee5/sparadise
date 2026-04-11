import React from 'react';
import './HowItWorks.css';
import { MousePointer2, MapPin, Calendar, Home } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
  {
    icon: <MousePointer2 size={32} />,
    title: "Choose Your Service",
    desc: "Browse our extensive menu of luxury spa treatments and select the perfect one for you."
  },
  {
    icon: <MapPin size={32} />,
    title: "Pick Your Location",
    desc: "Whether you're in Lagos, Abuja, or Port Harcourt, we'll find our way to your sanctuary."
  },
  {
    icon: <Calendar size={32} />,
    title: "Select Date & Time",
    desc: "Pick a slot that fits your schedule. We operate 7 days a week for your convenience."
  },
  {
    icon: <Home size={32} />,
    title: "We Come To You",
    desc: "Relax as our professional therapist arrives at your door with everything needed."
  }
];

const HowItWorks = () => {
  useScrollReveal();

  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span className="section-subtitle reveal">The Process</span>
          <h2 className="reveal shimmer-text">Simple Steps to Serenity</h2>
        </div>

        <div className="steps-container">
          <div className="steps-line"></div>
          {steps.map((step, index) => (
            <div key={index} className="step-card reveal bounce-reveal">
              <div className="step-icon">
                {step.icon}
                <div className="step-number">{index + 1}</div>
              </div>
              <div className="step-info">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
