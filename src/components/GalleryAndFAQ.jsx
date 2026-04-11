import React, { useState } from 'react';
import './GalleryAndFAQ.css';
import { Plus, Minus, Search } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800", alt: "White lady relaxing" },
  { id: 2, src: "https://images.unsplash.com/photo-1649751295468-953038600bef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D", alt: "Lady in treatment" },
  { id: 3, src: "https://images.unsplash.com/photo-1620050382792-434b5828873d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1PbWWqgKDBDorh525uecKaGZD21FGSoCeR", alt: "Lady massage" },
  { id: 4, src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800", alt: "Nigerian man spa session" },
  { id: 5, src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800", alt: "Luxury products" },
  { id: 6, src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800", alt: "Pedicure treatment" }
];

const faqs = [
  { q: "What areas do you cover?", a: "We currently provide our mobile spa services across Lagos, Abuja, and Port Harcourt. We bring all the luxury treatments right to your doorstep, whether it's your home, hotel, or office." },
  { q: "How do I book a session?", a: "Booking is simple! You can use our online booking form on this website. Select your city, service, date, and time. Once you confirm, a message will be sent to our WhatsApp, and our coordinator will finalize the details with you." },
  { q: "What should I prepare before my therapist arrives?", a: "Please ensure there's enough space for a massage table and a quiet environment for your relaxation. We provide all the necessary equipment, including towels, oils, and music." },
  { q: "Are your therapists qualified?", a: "Yes, all our therapists are highly trained, certified professionals with extensive experience in luxury spa treatments. They undergo regular training to maintain our high standards." },
  { q: "What is your cancellation policy?", a: "We request at least 12 hours' notice for any cancellations or rescheduling. Cancellations within less than 12 hours may be subject to a fee." }
];

const GalleryAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState(0);
  useScrollReveal();

  return (
    <div className="gallery-faq-section">
      <section id="gallery" className="section gallery">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-subtitle reveal">Our Gallery</span>
            <h2 className="reveal shimmer-text">Glimpse of Serenity</h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.id} className="gallery-item reveal bounce-reveal">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <Search size={30} color="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container">
          <div className="faq-wrapper">
            <div className="faq-header text-center" style={{ marginBottom: '60px' }}>
              <span className="section-subtitle reveal">Common Questions</span>
              <h2 className="reveal shimmer-text">Frequently Asked Questions</h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item reveal bounce-reveal ${openFaq === index ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>{faq.q}</span>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryAndFAQ;
