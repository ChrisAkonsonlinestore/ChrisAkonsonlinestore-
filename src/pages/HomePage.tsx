<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>chrisAkons online store | Shop Products & Services</title>

    <meta name="description"
          content="Welcome to chrisAkons online store. Explore products and services, browse our collection, and contact us for orders and inquiries in Nigeria.">

    <meta name="theme-color" content="#101b35">

    <style>
        :root {
            --primary: #101b35;
            --secondary: #d4af37;
            --background: #f5f7fb;
            --white: #ffffff;
            --text: #252b38;
            --muted: #687386;
            --border: #e5e9f0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
            scroll-padding-top: 85px;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: var(--background);
            color: var(--text);
            line-height: 1.6;
        }

        a {
            text-decoration: none;
        }

        button {
            font: inherit;
            cursor: pointer;
        }

        .container {
            width: min(1150px, 92%);
            margin: auto;
        }

        /* HEADER AND LOGO */

        header {
            background: var(--primary);
            color: var(--white);
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.12);
        }

        .navbar {
            min-height: 76px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .logo {
            color: var(--white);
            font-size: 1.35rem;
            font-weight: 800;
            white-space: nowrap;
        }

        .logo span {
            color: var(--secondary);
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 22px;
            list-style: none;
        }

        .nav-links a {
            color: var(--white);
            font-size: 0.92rem;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: var(--secondary);
        }

        .menu-toggle {
            display: none;
            color: white;
            background: transparent;
            border: 1px solid #ffffff55;
            padding: 7px 11px;
            border-radius: 6px;
        }

        /* HERO */

        .hero {
            background: linear-gradient(135deg, #101b35, #243e68);
            color: white;
            padding: 90px 0;
        }

        .hero-content {
            max-width: 760px;
        }

        .hero-label {
            display: inline-block;
            color: var(--secondary);
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: 0.8rem;
            margin-bottom: 15px;
        }

        .hero h1 {
            font-size: clamp(2.2rem, 5vw, 4rem);
            line-height: 1.15;
            margin-bottom: 20px;
        }

        .hero p {
            max-width: 650px;
            color: #e2e8f3;
            font-size: 1.08rem;
            margin-bottom: 30px;
        }

        .button-group {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 21px;
            border: 1px solid transparent;
            border-radius: 7px;
            font-weight: 700;
            transition: transform 0.2s, background 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn-primary {
            background: var(--secondary);
            color: #171717;
        }

        .btn-outline {
            border-color: #ffffff80;
            color: white;
        }

        .btn-dark {
            background: var(--primary);
            color: white;
        }

        .btn-whatsapp {
            background: #168b50;
            color: white;
        }

        /* GENERAL SECTIONS */

        section {
            padding: 65px 0;
        }

        .section-heading {
            text-align: center;
            margin-bottom: 35px;
        }

        .section-heading h2 {
            font-size: clamp(1.7rem, 3vw, 2.4rem);
            color: var(--primary);
            margin-bottom: 10px;
        }

        .section-heading p {
            color: var(--muted);
        }

        /* SEARCH */

        .search-box {
            max-width: 600px;
            margin: 0 auto 30px;
            display: flex;
            gap: 10px;
        }

        .search-box input {
            min-width: 0;
            flex: 1;
            padding: 13px 15px;
            border: 1px solid var(--border);
            border-radius: 7px;
            font-size: 1rem;
        }

        .search-box button {
            border: none;
        }

        /* PRODUCTS */

        .product-grid,
        .service-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
        }

        .product-card,
        .service-card {
            background: var(--white);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 18px rgba(16, 27, 53, 0.045);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover,
        .service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(16, 27, 53, 0.09);
        }

        .product-image,
        .service-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            background: #e9edf4;
            display: block;
        }

        .product-info,
        .service-info {
            padding: 20px;
        }

        .product-info h3,
        .service-info h3 {
            color: var(--primary);
            margin-bottom: 8px;
        }

        .product-description,
        .service-description {
            color: var(--muted);
            font-size: 0.92rem;
            margin-bottom: 14px;
        }

        .product-price {
            color: #987617;
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 15px;
        }

        .product-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .product-actions .btn {
            flex: 1;
            font-size: 0.85rem;
            padding: 10px;
        }

        .empty-state {
            grid-column: 1 / -1;
            padding: 35px 20px;
            text-align: center;
            background: white;
            border: 1px dashed #cbd3e0;
            border-radius: 10px;
            color: var(--muted);
        }

        /* SERVICES */

        .services-section {
            background: white;
        }

        .service-card {
            padding-bottom: 20px;
        }

        .service-info .btn {
            margin: 0 20px;
        }

        /* CONTACT */

        .contact-section {
            background: #edf1f7;
        }

        .contact-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 25px;
        }

        .contact-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid var(--border);
        }

        .contact-card h3 {
            color: var(--primary);
            margin-bottom: 15px;
        }

        .contact-item {
            margin: 12px 0;
            overflow-wrap: anywhere;
        }

        .contact-item strong {
            display: inline-block;
            min-width: 85px;
        }

        .contact-item a {
            color: #2456a6;
        }

        .social-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
        }

        /* FOOTER */

        footer {
            background: var(--primary);
            color: white;
            padding: 35px 0 20px;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 25px;
            padding-bottom: 25px;
        }

        .footer-content p {
            color: #d4dbea;
            margin-top: 8px;
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .footer-links a {
            color: white;
        }

        .copyright {
            text-align: center;
            border-top: 1px solid #ffffff25;
            padding-top: 18px;
            color: #d4dbea;
            font-size: 0.9rem;
        }

        /* WHATSAPP FLOATING BUTTON */

        .floating-whatsapp {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 999;
            background: #168b50;
            color: white;
            padding: 13px 18px;
            border-radius: 50px;
            font-weight: 700;
            box-shadow: 0 5px 18px #0002;
        }

        /* RESPONSIVE DESIGN */

        @media (max-width: 850px) {
            .menu-toggle {
                display: block;
            }

            .nav-links {
                display: none;
                position: absolute;
                top: 76px;
                left: 0;
                right: 0;
                background: var(--primary);
                padding: 20px 4%;
                flex-direction: column;
                align-items: flex-start;
                gap: 18px;
            }

            .nav-links.open {
                display: flex;
            }

            .product-grid,
            .service-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 560px) {
            .hero {
                padding: 65px 0;
            }

            .product-grid,
            .service-grid,
            .contact-grid {
                grid-template-columns: 1fr;
            }

            .product-image,
            .service-image {
                height: 240px;
            }

            .search-box {
                flex-direction: column;
            }

            .search-box .btn {
                width: 100%;
            }

            .footer-content {
                flex-direction: column;
            }

            .floating-whatsapp {
                right: 12px;
                bottom: 12px;
                font-size: 0.9rem;
            }
        }
    </style>
</head>

<body>

    <!-- HEADER: WEBSITE LOGO PRESERVED -->
    <header>
        <div class="container navbar">

            <a href="#home" class="logo" aria-label="chrisAkons online store homepage">
                chrisAkons <span>online store</span>
            </a>

            <button
                class="menu-toggle"
                id="menuToggle"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navLinks">
                ☰ Menu
            </button>

            <nav aria-label="Main navigation">
                <ul class="nav-links" id="navLinks">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Shop Products</a></li>
                    <li><a href="#services">Our Services</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li>
                        <a
                            href="https://www.facebook.com/share/1ErLVK3baj/"
                            target="_blank"
                            rel="noopener noreferrer">
                            Facebook
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
    </header>

    <main>

        <!-- HOMEPAGE: STORE-FOCUSED INTRODUCTION -->
        <section class="hero" id="home">
            <div class="container">
                <div class="hero-content">

                    <span class="hero-label">Welcome to Our Store</span>

                    <h1>Discover Products and Services at chrisAkons online store</h1>

                    <p>
                        Explore our collection, discover available services,
                        and contact us directly for product inquiries and orders.
                        Enjoy a convenient way to find what you need.
                    </p>

                    <div class="button-group">
                        <a href="#products" class="btn btn-primary">
                            Shop Now
                        </a>

                        <a href="#services" class="btn btn-outline">
                            Explore Services
                        </a>

                        <a href="#contact" class="btn btn-outline">
                            Contact Us
                        </a>
                    </div>

                </div>
            </div>
        </section>

        <!-- PRODUCT CATALOGUE -->
        <section id="products">
            <div class="container">

                <div class="section-heading">
                    <h2>Shop Our Products</h2>
                    <p>Browse our available products and contact us to order.</p>
                </div>

                <form class="search-box" id="productSearchForm">
                    <input
                        type="search"
                        id="productSearch"
                        placeholder="Search products..."
                        aria-label="Search products">

                    <button class="btn btn-dark" type="submit">
                        Search
                    </button>
                </form>

                <div class="product-grid" id="productGrid">

                    <!--
                    PRODUCT INTEGRATION NOTE:
                    Connect this container to your existing product data and
                    rendering JavaScript. Do not delete your existing product
                    database, product-upload feature, or product management code.
                    -->

                    <div class="empty-state">
                        <h3>Discover Our Products</h3>
                        <p>
                            Products will appear here when the store's existing
                            product system loads them.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- SERVICES -->
        <section class="services-section" id="services">
            <div class="container">

                <div class="section-heading">
                    <h2>Our Services</h2>
                    <p>
                        Explore our available services and contact us for details.
                    </p>
                </div>

                <div class="service-grid" id="serviceGrid">

                    <!--
                    SERVICE INTEGRATION NOTE:
                    Connect this container to your existing service data and
                    rendering JavaScript. Preserve your existing service
                    image-upload and management features.
                    -->

                    <div class="empty-state">
                        <h3>Explore Our Services</h3>
                        <p>
                            Available services will appear here when the store's
                            existing service system loads them.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- CONTACT: NO OWNER BIOGRAPHY OR PROFILE PICTURE -->
        <section class="contact-section" id="contact">
            <div class="container">

                <div class="section-heading">
                    <h2>Contact Us</h2>
                    <p>
                        Have a question about a product or service?
                        Get in touch with us.
                    </p>
                </div>

                <div class="contact-grid">

                    <div class="contact-card">
                        <h3>Customer Support</h3>

                        <p class="contact-item">
                            <strong>Phone:</strong>
                            <a href="tel:08109226976">08109226976</a>
                        </p>

                        <p class="contact-item">
                            <strong>Email:</strong>
                            <a href="mailto:christianakobundu09@gmail.com">
                                christianakobundu09@gmail.com
                            </a>
                        </p>

                        <p class="contact-item">
                            <strong>Location:</strong>
                            Owerri, Imo State, Nigeria
                        </p>

                        <div class="social-buttons">
                            <a
                                class="btn btn-whatsapp"
                                href="https://wa.me/2348109226976"
                                target="_blank"
                                rel="noopener noreferrer">
                                WhatsApp Us
                            </a>

                            <a
                                class="btn btn-dark"
                                href="https://www.facebook.com/share/1ErLVK3baj/"
                                target="_blank"
                                rel="noopener noreferrer">
                                Visit Facebook
                            </a>
                        </div>
                    </div>

                    <div class="contact-card">
                        <h3>Why Shop With Us?</h3>

                        <p>
                            Browse available products, explore our services,
                            and contact us directly when you need assistance.
                        </p>

                        <p style="margin-top: 15px;">
                            We welcome product inquiries and service requests.
                            Please contact us to confirm availability, prices,
                            and delivery arrangements.
                        </p>

                        <a
                            href="https://wa.me/2348109226976"
                            class="btn btn-primary"
                            style="margin-top: 20px;"
                            target="_blank"
                            rel="noopener noreferrer">
                            Make an Inquiry
                        </a>
                    </div>

                </div>
            </div>
        </section>

    </main>

    <!-- FOOTER: WEBSITE BRANDING PRESERVED -->
    <footer>
        <div class="container">

            <div class="footer-content">

                <div>
                    <a href="#home" class="logo">
                        chrisAkons <span>online store</span>
                    </a>

                    <p>Your destination for products and services.</p>
                    <p>Owerri, Imo State, Nigeria.</p>
                </div>

                <div class="footer-links">
                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                    <a
                        href="https://www.facebook.com/sha
