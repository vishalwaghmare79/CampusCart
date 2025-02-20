import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="footer-item">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p>
                <a href="tel:+918805232927" className="hover:text-gray-400">
                  +91-8805232927
                </a>
              </p>
            </div>
            <div className="footer-item">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <p>
                <a
                  href="mailto:waghmarevishal438@gmail.com"
                  className="hover:text-gray-400"
                >
                  waghmarevishal438@gmail.com
                </a>
              </p>
            </div>
            <div className="footer-item">
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <p>
                <a
                  href="mailto:waghmarevishal438@gmail.com"
                  className="hover:text-gray-400"
                >
                  waghmarevishal438@gmail.com
                </a>
              </p>
            </div>
            <div className="footer-item">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/vishal-waghmare-708248189"
                  aria-label="LinkedIn"
                  className="hover:text-gray-400"
                >
                  <i className="ri-linkedin-fill text-2xl"></i>
                </a>
                <a
                  href="https://github.com/vishalwaghmare4"
                  aria-label="GitHub"
                  className="hover:text-gray-400"
                >
                  <i className="ri-github-fill text-2xl"></i>
                </a>
                <a
                  href="https://twitter.com/_vishalwaghmare"
                  aria-label="Twitter"
                  className="hover:text-gray-400"
                >
                  <i className="ri-twitter-fill text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Developed and Designed by Vishal Waghmare
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;