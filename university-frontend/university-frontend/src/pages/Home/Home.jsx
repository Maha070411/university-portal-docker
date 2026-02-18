import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal/Modal';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    endDate: '',
    description: '',
    type: 'event',
    venue: '',
    organizer: ''
  });

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        endDate: '',
        description: '',
        type: 'event',
        venue: '',
        organizer: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Excellence University</h1>
            <p className="hero-subtitle">
              Empowering minds, shaping futures. Join us in the pursuit of academic excellence and innovation.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/login')}>
                Access Portal
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>
              <h3 className="stat-number">15,000+</h3>
              <p className="stat-label">Students</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>
              <h3 className="stat-number">800+</h3>
              <p className="stat-label">Faculty Members</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Programs</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <h3 className="stat-number">95%</h3>
              <p className="stat-label">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <div className="section-header-with-action">
            <div className="section-header">
              <h2>Upcoming Events & News</h2>
              <p>Stay updated with the latest happenings at our university</p>
            </div>
            
          </div>
          
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className={`event-badge ${event.type}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                {event.venue && <p className="event-venue">📍 {event.venue}</p>}
                <p className="event-description">{event.description}</p>
                <div className="event-card-actions">
                  
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="placement-section">
        <div className="container">
          <div className="section-header">
            <h2>Placement Highlights</h2>
            <p>Our students are placed in leading companies worldwide</p>
          </div>
          
          <div className="placement-stats">
            <div className="placement-card">
              <h3>💰 Highest Package</h3>
              <p className="highlight-number">$180,000</p>
              <p className="highlight-label">Annual CTC</p>
            </div>
            <div className="placement-card">
              <h3>📊 Average Package</h3>
              <p className="highlight-number">$75,000</p>
              <p className="highlight-label">Annual CTC</p>
            </div>
            <div className="placement-card">
              <h3>🏢 Top Recruiters</h3>
              <p className="highlight-label">Google • Microsoft • Amazon • Apple</p>
            </div>
          </div>
        </div>
      </section>

    

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingEvent ? 'Edit Event' : 'Add New Event'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Annual Tech Fest"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="event">Event</option>
              <option value="placement">Placement</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Start Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date (Optional)</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="e.g., Main Auditorium"
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizer">Organizer</label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleInputChange}
              placeholder="e.g., Student Council"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Brief description of the event"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
