import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LegalPages } from './pages/LegalPages';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize hash or path with current route
  useEffect(() => {
    const handleHashChange = () => {
      let rawRoute = window.location.hash.replace('#', '').trim();

      // Check pathname fallback (e.g. /terms)
      if (!rawRoute) {
        const pathname = window.location.pathname.replace(/^\//, '').trim();
        if (pathname) {
          rawRoute = pathname;
        }
      }

      const [route, queryStr] = (rawRoute || 'home').split('?');
      const params: Record<string, string> = {};

      if (queryStr) {
        const searchParams = new URLSearchParams(queryStr);
        searchParams.forEach((val, key) => {
          params[key] = val;
        });
      }

      setCurrentPage(route || 'home');
      setPageParams(params);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateTo = (page: string, params: Record<string, any> = {}) => {
    setCurrentPage(page);
    setPageParams(params);

    let newHash = `#${page}`;
    const keys = Object.keys(params);
    if (keys.length > 0) {
      const qs = keys
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
      newHash += `?${qs}`;
    }

    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}

          {currentPage === 'shop' && (
            <ShopPage
              onNavigate={navigateTo}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentPage === 'product-detail' && (
            <ProductDetailPage
              productId={pageParams.id || ''}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}

          {currentPage === 'service-detail' && (
            <ServiceDetailPage
              serviceId={pageParams.id || ''}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

          {currentPage === 'gallery' && <GalleryPage onNavigate={navigateTo} />}

          {currentPage === 'cart' && <CartPage onNavigate={navigateTo} />}

          {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}

          {currentPage === 'login' && <AdminLoginPage onNavigate={navigateTo} />}

          {currentPage === 'admin' && (
            <AdminDashboardPage
              onNavigate={navigateTo}
              initialTab={pageParams.tab || 'products'}
            />
          )}

          {currentPage === 'privacy' && (
            <LegalPages pageType="privacy" onNavigate={navigateTo} />
          )}

          {currentPage === 'terms' && (
            <LegalPages pageType="terms" onNavigate={navigateTo} />
          )}
        </main>

        <Footer onNavigate={navigateTo} />
        <WhatsAppFloatingButton />
      </div>
    </StoreProvider>
  );
}
