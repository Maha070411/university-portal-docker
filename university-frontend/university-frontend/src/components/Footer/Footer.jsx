import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Information</h3>
            <p>📍 123 University Ave, Education City</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@excellenceuniversity.edu</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/admissions">Admissions</a></li>
              <li><a href="/academics">Academics</a></li>
              <li><a href="/research">Research</a></li>
              <li><a href="/campus-life">Campus Life</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">📘 Facebook</a>
              <a href="#" className="social-link">🐦 Twitter</a>
              <a href="#" className="social-link">💼 LinkedIn</a>
              <a href="#" className="social-link">📸 Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Excellence University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
