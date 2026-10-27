import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="store-page">
      <header className="store-header">
        <div className="store-container store-navbar">
          <a href="#home" className="store-logo">
            chrisAkons <span>online store</span>
          </a>

          <nav className="store-nav">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a
              href="https://www.facebook.com/share/1ErLVK3baj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="store-hero" id="home">
          <div className="store-container">
            <span className="store-label">WELCOME TO OUR STORE</span>

            <h1>
              Discover Products and Services at chrisAkons online store
            </h1>

            <p>
              Explore our collection, discover available services,
              and contact us directly for product inquiries and orders.
            </p>

            <div className="store-buttons">
              <a href="#products" className="store-button store-gold">
                Shop Products
              </a>

              <a href="#services" className="store-button store-outline">
                Explore Services
              </a>

              <a href="#contact" className="store-button store-outline">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="store-section" id="products">
          <div className="store-container">
            <div className="store-heading">
              <h2>Shop Our Products</h2>
              <p>Discover products available in our store.</p>
            </div>

            <div id="productGrid" className="store-grid">
              <div className="store-empty">
                <h3>Our Product Collection</h3>
                <p>
                  Connect your existing product catalogue here to display
                  your products, images, descriptions, and prices.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="store-section store-services"
          id="services"
        >
          <div className="store-container">
            <div className="store-heading">
              <h2>Our Services</h2>
              <p>Explore our services and contact us for inquiries.</p>
            </div>

            <div id="serviceGrid" className="store-grid">
              <div className="store-empty">
                <h3>Available Services</h3>
                <p>
                  Connect your existing services catalogue here to display
                  your service descriptions and images.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="store-section store-contact"
          id="contact"
        >
          <div className="store-container">
            <div className="store-heading">
              <h2>Contact Us</h2>
              <p>We are available for product and service inquiries.</p>
            </div>

            <div className="store-contact-grid">
              <div className="store-card">
                <h3>Customer Support</h3>

                <p>
                  <strong>Phone: </strong>
                  <a href="tel:08109226976">08109226976</a>
                </p>

                <p>
                  <strong>Email: </strong>
                  <a href="mailto:christianakobundu09@gmail.com">
                    christianakobundu09@gmail.com
                  </a>
                </p>

                <p>
                  <strong>Location: </strong>
                  Owerri, Imo State, Nigeria
                </p>

                <div className="store-buttons">
                  <a
                    className="store-button store-whatsapp"
                    href="https://wa.me/2348109226976"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us
                  </a>

                  <a
                    className="store-button store-dark"
                    href="https://www.facebook.com/share/1ErLVK3baj/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Facebook
                  </a>
                </div>
              </div>

              <div className="store-card">
                <h3>Shop With Us</h3>

                <p>
                  Browse our products, explore our services, and contact
                  us to confirm prices, availability, and delivery details.
                </p>

                <a
                  className="store-button store-gold"
                  href="https://wa.me/2348109226976"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Make an Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="store-footer">
        <div className="store-container">
          <a href="#home" className="store-logo">
            chrisAkons <span>online store</span>
          </a>

          <p>Your destination for products and services.</p>
          <p>Owerri, Imo State, Nigeria.</p>

          <div className="store-footer-links">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a
              href="https://www.facebook.com/share/1ErLVK3baj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>

          <p className="store-copyright">
            © {new Date().getFullYear()} chrisAkons online store.
            All rights reserved.
          </p>
        </div>
      </footer>

      <a
        className="store-floating-whatsapp"
        href="https://wa.me/2348109226976"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
            }
