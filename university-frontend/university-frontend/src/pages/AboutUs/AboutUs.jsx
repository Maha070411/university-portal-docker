import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Excellence University</h1>
          <p className="lead">Shaping tomorrow's leaders through innovation and excellence</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide world-class education that empowers students with knowledge, 
                skills, and values needed to excel in a rapidly changing global society.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be a leading institution recognized globally for academic excellence, 
                innovative research, and producing graduates who make a positive impact.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Our Values</h3>
              <p>
                Integrity, Innovation, Inclusivity, and Impact - the four pillars that 
                guide everything we do at Excellence University.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          <h2>Our History</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1950</div>
              <div className="timeline-content">
                <h4>Foundation</h4>
                <p>Excellence University was established with 100 students and 10 faculty members.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1980</div>
              <div className="timeline-content">
                <h4>National Recognition</h4>
                <p>Received accreditation and recognition as a leading institution.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2000</div>
              <div className="timeline-content">
                <h4>Global Expansion</h4>
                <p>Launched international programs and partnerships worldwide.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2026</div>
              <div className="timeline-content">
                <h4>Digital Innovation</h4>
                <p>Leading the way in digital education and research excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
