import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h4>Contact Us</h4>
        <p><a href="tel:+18001234567">1800-123-4567</a></p>
      </div>
      <div className="footer-item">
        <h4>Support</h4>
        <p><a href="https://www.shopeease.com/help">shopeease.com/help</a></p>
      </div>
      <div className="footer-item">
        <h4>Get in Touch</h4>
        <p><a href="mailto:support@shopeease.com">support@shopeease.com</a></p>
      </div>
      <div className="footer-item social-icons">
        <a href="https://www.facebook.com/shopeease" aria-label="Facebook">
          <i className="ri-facebook-fill"></i>
        </a>
        <a href="https://www.twitter.com/shopeease" aria-label="Twitter">
          <i className="ri-twitter-fill"></i>
        </a>
        <a href="https://www.instagram.com/shopeease" aria-label="Instagram">
          <i className="ri-instagram-fill"></i>
        </a>
      </div>
      <div className="footer-item">
        <p>
          <a href="https://www.shopeease.com/terms-conditions">Terms & Conditions</a> -{' '}
          <a href="https://www.shopeease.com/privacy-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
