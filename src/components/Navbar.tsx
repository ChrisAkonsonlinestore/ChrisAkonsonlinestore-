import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  Search,
  Shield,
  User,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const { cartCount, settings, isAdmin, user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Products' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a1931] text-white shadow-xl border-b border-[#d4af37]/20">
      {/* Top Banner with phone & whatsapp quick contact */}
      <div className="bg-[#061021] text-xs py-1.5 px-4 border-b border-white/5 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Owerri, Imo State, Nigeria
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:inline-flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
              title="Visit our Facebook Page"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Facebook</span>
            </a>
            {isAdmin && (
              <>
                <span className="text-white/40">|</span>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold text-[11px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin Panel</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo / Brand Name */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img
              src="/logo-white.png"
              alt="ChrisAkons STORE Logo"
              className="h-10 w-10 rounded-full object-contain bg-white p-1"
            />
            <div>
              <div className="font-bold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1">
                <span>chrisAkons</span>
                <span className="text-[#d4af37] font-serif font-light text-sm sm:text-base tracking-widest uppercase">
                  store
                </span>
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium tracking-wide">
                Quality Products & Services
              </div>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, services, gadgets..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'shop') {
                    onNavigate('shop');
                  }
                }}
                className="w-full bg-slate-900/80 border border-white/15 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-amber-400 bg-white/10 shadow-inner'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search toggle (mobile), Cart, Admin Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`relative p-2.5 rounded-xl transition flex items-center gap-2 ${
                currentPage === 'cart'
                  ? 'bg-amber-400 text-[#0a1931]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a1931] shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin entry point */}
            <button
              onClick={() => handleNavClick(user ? 'admin' : 'login')}
              className={`p-2.5 rounded-xl transition flex items-center gap-1 text-xs font-medium ${
                currentPage === 'admin' || currentPage === 'login'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={isAdmin ? 'Admin Dashboard' : 'Admin Login'}
            >
              {isAdmin ? (
                <Shield className="w-5 h-5 text-amber-400" />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span className="hidden xl:inline">
                {isAdmin ? 'Admin' : 'Login'}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input dropdown */}
        {searchOpen && (
          <div className="md:hidden pb-4 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, services..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'shop') {
                    onNavigate('shop');
                  }
                }}
                autoFocus
                className="w-full bg-slate-900 border border-amber-400/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071326] border-b border-amber-400/20 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-medium transition ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-400 font-bold border-l-4 border-amber-400'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with Christian on WhatsApp</span>
            </a>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Owner</span>
              </a>
              <button
                onClick={() => handleNavClick(user ? 'admin' : 'login')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-amber-400 text-xs font-medium transition"
              >
                <Shield className="w-4 h-4" />
                <span>{isAdmin ? 'Admin Dashboard' : 'Admin Portal'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
