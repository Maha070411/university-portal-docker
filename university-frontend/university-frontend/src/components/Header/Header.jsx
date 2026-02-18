import React from 'react';
import './Header.css';
// Uncomment below to use logo from assets folder:
// import logo from '../../assets/images/logo.png';

const Header = () => {
  // Choose your logo method:
  // Method 1: Use emoji (current - no image needed)
  const useEmoji = true;
  
  // Method 2: Use image from public folder (place image in public/images/logo.png)
  const logoPublicPath = '/images/logo.png';
  
  // Method 3: Use imported image (uncomment import above and use variable)
  // const logoImported = logo;

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-section">
          <div className="university-logo">
            {useEmoji ? (
              // Current: Emoji placeholder
              <div className="logo-icon">🎓</div>
            ) : (
              // To use real image: Set useEmoji = false and add your image to public/images/logo.png
              <img 
                src={logoPublicPath} 
                alt="Excellence University Logo" 
                className="logo-image"
                onError={(e) => {
                  // Fallback to emoji if image not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            )}
            {!useEmoji && <div className="logo-icon" style={{display: 'none'}}>🎓</div>}
          </div>
          <div className="university-info">
            <h1 className="university-name">Excellence University</h1>
            <p className="university-motto">Knowledge • Innovation • Excellence</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
