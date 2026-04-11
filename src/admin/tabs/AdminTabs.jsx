import React, { useState } from 'react';
import { Calendar, LayoutDashboard, Users, Image as ImageIcon, FileText, Settings, LogOut, Search, Trash, MessageCircle, MoreVertical } from 'lucide-react';
import { useLocalStorage } from '../../hooks';
import './AdminTabs.css';

// ----------------- Bookings Tab -----------------
export const BookingsTab = ({ bookings, setBookings }) => {
  const [filterCity, setFilterCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(b => 
    (filterCity ? b.city === filterCity : true) &&
    (searchTerm ? (b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.serviceName.toLowerCase().includes(searchTerm.toLowerCase())) : true)
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const sendWhatsApp = (booking) => {
    const message = `Hello ${booking.name}, this is SpaRadise Mobile Spa regarding your booking for ${booking.serviceName} on ${booking.date} at ${booking.time}.`;
    window.open(`https://wa.me/${booking.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div>
      <div className="tab-header">
        <h2 className="tab-title">Manage Bookings</h2>
        <div className="tab-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name or service..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="form-select" style={{ padding: '0.6rem' }} value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="">All Cities</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client / City</th>
              <th>Service / Price</th>
              <th>Date / Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(b => (
              <tr key={b.id}>
                <td>
                  <div className="cell-main">{b.name}</div>
                  <div className="cell-sub">{b.city} • {b.phone}</div>
                </td>
                <td>
                  <div className="cell-main">{b.serviceName}</div>
                  <div className="cell-sub">₦{b.price.toLocaleString()}</div>
                </td>
                <td>
                  <div className="cell-main">{b.date}</div>
                  <div className="cell-sub">{b.time}</div>
                </td>
                <td>
                  <select 
                    className={`status-badge status-${b.status.toLowerCase()}`}
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    style={{ border: 'none', cursor: 'pointer', appearance: 'none', padding: '0.4rem 0.8rem' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <div className="action-row">
                    <button className="action-btn" onClick={() => sendWhatsApp(b)}><MessageCircle size={18} /></button>
                    <button className="action-btn" onClick={() => deleteBooking(b.id)}><Trash size={18} color="#ef4444" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------- Services Tab -----------------
export const ServicesTab = ({ services, setServices }) => {
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Massage', description: '', duration: '', price: '', image: '', visible: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const saveService = (e) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...formData, id: s.id } : s));
    } else {
      setServices([...services, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', category: 'Massage', description: '', duration: '', price: '', image: '', visible: true });
    setEditingService(null);
  };

  return (
    <div>
      <div className="tab-header">
        <h2 className="tab-title">Manage Services</h2>
        <button className="nav-cta" onClick={() => { setEditingService(null); setFormData({ name: '', category: 'Massage', description: '', duration: '', price: '', image: '', visible: true }); }}>
          Add New Service
        </button>
      </div>

      <div className="admin-grid-layout">
        <div className="service-form-container glass">
          <h3 style={{ marginBottom: '1.5rem' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
          <form onSubmit={saveService}>
            <div className="form-group">
              <label className="form-label">Service Name</label>
              <input type="text" name="name" className="form-input" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" value={formData.category} onChange={handleInputChange}>
                  <option value="Massage">Massage</option>
                  <option value="Facial">Facial</option>
                  <option value="Body Treatments">Body Treatments</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Waxing">Waxing</option>
                  <option value="Packages">Packages</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input type="text" name="duration" className="form-input" value={formData.duration} onChange={handleInputChange} placeholder="e.g. 60 mins" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Price (₦)</label>
              <input type="number" name="price" className="form-input" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {formData.image && <img src={formData.image} alt="Preview" style={{ width: '100px', marginTop: '1rem', borderRadius: '4px' }} />}
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-textarea" value={formData.description} onChange={handleInputChange} required></textarea>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" name="visible" checked={formData.visible} onChange={handleInputChange} />
              <label className="form-label" style={{ marginBottom: 0 }}>Visible on Website</label>
            </div>
            <button type="submit" className="form-btn btn-next" style={{ width: '100%' }}>
              {editingService ? 'Update Service' : 'Save Service'}
            </button>
          </form>
        </div>

        <div className="service-list">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={s.image} alt={s.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div className="cell-main">{s.name}</div>
                    </div>
                  </td>
                  <td>{s.category}</td>
                  <td>₦{Number(s.price).toLocaleString()}</td>
                  <td>
                    <div className="action-row">
                      <button className="action-btn" onClick={() => { setEditingService(s); setFormData(s); }}>Edit</button>
                      <button className="action-btn" onClick={() => setServices(services.filter(item => item.id !== s.id))}><Trash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ----------------- Content Tab -----------------
export const ContentTab = ({ content, setContent }) => {
  const [activeSubTab, setActiveSubTab] = useState('hero');

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, hero: { ...content.hero, [name]: value } });
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, about: { ...content.about, [name]: value } });
  };

  return (
    <div>
      <div className="tab-header">
        <h2 className="tab-title">Website Content</h2>
        <div className="sub-tabs">
          <button className={`sub-tab-btn ${activeSubTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveSubTab('hero')}>Hero</button>
          <button className={`sub-tab-btn ${activeSubTab === 'about' ? 'active' : ''}`} onClick={() => setActiveSubTab('about')}>About</button>
          <button className={`sub-tab-btn ${activeSubTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveSubTab('faq')}>FAQ</button>
        </div>
      </div>

      <div className="content-editor glass">
        {activeSubTab === 'hero' && (
          <div className="editor-section">
            <h3 style={{ marginBottom: '1.5rem' }}>Edit Hero Section</h3>
            <div className="form-group">
              <label className="form-label">Main Headline</label>
              <input type="text" name="headline" className="form-input" value={content.hero.headline} onChange={handleHeroChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Subtext</label>
              <textarea name="subtext" className="form-textarea" value={content.hero.subtext} onChange={handleHeroChange}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Badge Text</label>
              <input type="text" name="badge" className="form-input" value={content.hero.badge} onChange={handleHeroChange} />
            </div>
          </div>
        )}

        {activeSubTab === 'about' && (
          <div className="editor-section">
            <h3 style={{ marginBottom: '1.5rem' }}>Edit About Section</h3>
            <div className="form-group">
              <label className="form-label">About Headline</label>
              <input type="text" name="headline" className="form-input" value={content.about.headline} onChange={handleAboutChange} />
            </div>
            <div className="form-group">
              <label className="form-label">About Text</label>
              <textarea name="text" className="form-textarea" style={{ height: '200px' }} value={content.about.text} onChange={handleAboutChange}></textarea>
            </div>
          </div>
        )}

        {activeSubTab === 'faq' && (
          <div className="editor-section">
            <h3 style={{ marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
            {content.faq.map((q, idx) => (
              <div key={idx} className="faq-editor-item" style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <div className="form-group">
                  <label className="form-label">Question {idx + 1}</label>
                  <input type="text" className="form-input" value={q.question} onChange={(e) => {
                    const newFaq = [...content.faq];
                    newFaq[idx].question = e.target.value;
                    setContent({ ...content, faq: newFaq });
                  }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Answer</label>
                  <textarea className="form-textarea" value={q.answer} onChange={(e) => {
                    const newFaq = [...content.faq];
                    newFaq[idx].answer = e.target.value;
                    setContent({ ...content, faq: newFaq });
                  }}></textarea>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
