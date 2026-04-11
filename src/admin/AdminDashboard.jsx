import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, LogOut, Trash2, CheckCircle, MessageSquare } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings.reverse());
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated.reverse()));
  };

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify([...updated].reverse()));
  };

  const sendWhatsApp = (booking) => {
    const message = `Hello ${booking.name}, this is SpaRadise Mobile Spa regarding your booking for ${booking.service} on ${booking.date} at ${booking.time}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-logo logo">Spa<span>Radise</span></div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
            <Calendar size={20} /> Bookings
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="admin-profile">Admin</div>
        </header>

        {activeTab === 'bookings' && (
          <div className="bookings-tab glass">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.date} @ {booking.time}</td>
                      <td>{booking.name}</td>
                      <td>{booking.service}</td>
                      <td>{booking.city}</td>
                      <td>{booking.phone}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="icon-btn whatsapp" onClick={() => sendWhatsApp(booking)} title="Send WhatsApp">
                          <MessageSquare size={18} />
                        </button>
                        <button className="icon-btn confirm" onClick={() => updateStatus(booking.id, 'Confirmed')} title="Confirm">
                          <CheckCircle size={18} />
                        </button>
                        <button className="icon-btn delete" onClick={() => deleteBooking(booking.id)} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>No bookings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
