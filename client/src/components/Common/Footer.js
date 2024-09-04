import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h4>Contact Us</h4>
        <p><a href="tel:+918805232927">+91-8805232927</a></p>
      </div>
      <div className="footer-item">
        <h4>Support</h4>
        <p><a href="mailto:waghmarevishal438@gmail.com">waghmarevishal438@gmail.com</a></p>
      </div>
      <div className="footer-item">
        <h4>Get in Touch</h4>
        <p><a href="mailto:waghmarevishal438@gmail.com">waghmarevishal438@gmail.com</a></p>
      </div>
      <div className="footer-item social-icons">
        <a href="https://www.linkedin.com/in/vishal-waghmare-708248189" aria-label="LinkedIn">
          <i className="ri-linkedin-fill"></i>
        </a>
        <a href="https://github.com/vishalwaghmare4" aria-label="GitHub">
          <i className="ri-github-fill"></i>
        </a>
        <a href="https://twitter.com/vishalwaghmare_" aria-label="Twitter">
          <i className="ri-twitter-fill"></i>
        </a>
      </div>
      <div className="footer-item">
        <p>Developed and Designed by Vishal Waghmare</p>
      </div>
    </footer>
  );
};

export default Footer;
