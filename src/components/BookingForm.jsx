import React, { useState } from 'react';
import './BookingForm.css';
import { MapPin, ShoppingBag, Clock, User, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const cities = ["Lagos", "Abuja", "Port Harcourt"];
const services = [
  "Swedish Massage", "Deep Tissue Massage", "Hot Stone Therapy",
  "Luxury Hydrafacial", "Anti-Aging Facial", 
  "Coffee Body Scrub", "Seaweed Body Wrap",
  "Luxury Pedicure", "Gel Manicure",
  "Full Body Wax", "Royal Spa Day"
];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    service: "",
    address: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = { ...formData, id: Date.now(), timestamp: new Date().toISOString(), status: 'Pending' };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // WhatsApp Redirect
    const message = `*NEW SPA BOOKING*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Service:* ${formData.service}\n` +
      `*City:* ${formData.city}\n` +
      `*Date:* ${formData.date}\n` +
      `*Time:* ${formData.time}\n` +
      `*Address:* ${formData.address}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Notes:* ${formData.notes || 'None'}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348142495552?text=${encodedMessage}`;
    
    setIsSuccess(true);
    window.open(whatsappUrl, '_blank');
  };

  useScrollReveal();

  if (isSuccess) {
    return (
      <section id="booking" className="section booking">
        <div className="container">
          <div className="success-modal reveal bounce-reveal">
            <CheckCircle2 size={100} color="var(--gold)" />
            <h2 className="shimmer-text">Booking Confirmed!</h2>
            <p>Your luxury session has been booked. Our therapist will contact you shortly via WhatsApp to finalize details.</p>
            <button className="btn btn-primary" onClick={() => { setIsSuccess(false); setStep(1); setFormData({}); }}>
              Book Another Session
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section booking">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <span className="section-subtitle reveal">Reservation</span>
          <h2 className="reveal shimmer-text">Experience Luxury at Home</h2>
        </div>

        <div className="booking-container reveal bounce-reveal glass">
          <div className="booking-steps">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`step-indicator ${step === i ? 'active' : step > i ? 'completed' : ''}`}>
                {i}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            {step === 1 && (
              <div className="form-step">
                <h3><MapPin size={24} /> Select Your City</h3>
                <div className="options-grid">
                  {cities.map(city => (
                    <label key={city} className={`option-card ${formData.city === city ? 'active' : ''}`}>
                      <input type="radio" name="city" value={city} checked={formData.city === city} onChange={handleChange} required />
                      <span>{city}</span>
                    </label>
                  ))}
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.city}>Next Step</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h3><ShoppingBag size={24} /> Select Your Service</h3>
                <select name="service" value={formData.service} onChange={handleChange} required className="custom-select">
                  <option value="">-- Choose a Service --</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.service}>Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h3><Clock size={24} /> When & Where?</h3>
                <div className="form-group">
                  <label>Full Address</label>
                  <input type="text" name="address" placeholder="123 Luxury Lane, Victoria Island" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.address || !formData.date || !formData.time}>Next Step</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-step">
                <h3><User size={24} /> Your Details</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Special Requests (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.name || !formData.phone || !formData.email}>Review Booking</button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="form-step summary">
                <h3>Review & Confirm</h3>
                <div className="summary-card">
                  <div className="summary-item"><strong>City:</strong> {formData.city}</div>
                  <div className="summary-item"><strong>Service:</strong> {formData.service}</div>
                  <div className="summary-item"><strong>When:</strong> {formData.date} at {formData.time}</div>
                  <div className="summary-item"><strong>Where:</strong> {formData.address}</div>
                  <div className="summary-item"><strong>Client:</strong> {formData.name} ({formData.phone})</div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="submit" className="btn btn-primary">Confirm & Send WhatsApp</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
