import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Truck,
  Clock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings } = useStore();
  const currentYear = new Date().getFullYear();

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071326] text-slate-300 border-t border-[#d4af37]/20 pt-16 pb-10">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Verified Owner</h4>
              <p className="text-xs text-slate-400">Christian Akobundu, Owerri</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Direct WhatsApp Order</h4>
              <p className="text-xs text-slate-400">Fast inquiry & confirmation</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Delivery Available</h4>
              <p className="text-xs text-slate-400">Owerri & across Nigeria</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Currency: ₦ Naira</h4>
              <p className="text-xs text-slate-400">Transparent pricing & invoices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-white.png"
                alt="ChrisAkons STORE Logo"
                className="h-10 w-10 rounded-full object-contain bg-white p-1 shadow-md"
              />
              <div>
                <span className="text-xl font-bold text-white block">chrisAkons</span>
                <span className="text-xs font-serif text-amber-400 tracking-widest uppercase">
                  online store
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Owned and operated by <strong className="text-white">Christian Akobundu</strong> in Owerri, Imo State, Nigeria. Quality products, reliable services, and personal customer communication.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                title="Facebook Page"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center hover:bg-amber-400 hover:text-[#0a1931] transition"
                title="Call 08109226976"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-9 h-9 rounded-lg bg-purple-600/30 text-purple-400 border border-purple-500/30 flex items-center justify-center hover:bg-purple-600 hover:text-white transition"
                title="Email christianakobundu09@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full"></span>
              Explore Store
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-amber-400 transition"
                >
                  Shop Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-amber-400 transition"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-amber-400 transition"
                >
                  Our Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-400 transition"
                >
                  Meet Christian Akobundu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-amber-400 transition"
                >
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Support */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full"></span>
              Customer Care & Policy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-400 transition"
                >
                  Contact chrisAkons
                </button>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('privacy');
                  }}
                  className="hover:text-amber-400 transition inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('terms');
                  }}
                  className="hover:text-amber-400 transition inline-block text-amber-300 font-medium"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition flex items-center gap-1 text-emerald-400"
                >
                  <span>WhatsApp Inquiry Line</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('login')}
                  className="hover:text-amber-400 transition text-slate-400"
                >
                  Admin Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full"></span>
              Get In Touch
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="font-medium text-white block">Location</span>
                  <span className="text-slate-400">{settings.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="font-medium text-white block">Phone</span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-amber-400 hover:underline"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="font-medium text-white block">Email</span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-slate-300 hover:text-white hover:underline break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="font-medium text-white block">Hours</span>
                  <span className="text-slate-400">Mon - Sat: 8:00 AM - 7:00 PM (WhatsApp 24/7)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} <strong className="text-white">chrisAkons online store</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Owned by Christian Akobundu</span>
            <span>•</span>
            <span>Owerri, Imo State, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
