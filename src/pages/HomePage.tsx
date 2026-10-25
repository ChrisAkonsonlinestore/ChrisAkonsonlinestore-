import React from 'react';
import {
  ShoppingBag,
  Wrench,
  PhoneCall,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  MapPin,
  Camera,
  Star,
  Eye,
  Plus,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira, createProductWhatsAppMessage } from '../utils/format';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

const christianImg = "/christian-final.jpg";

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const {
    products,
    services,
    settings,
    isAdmin,
    addToCart,
    isDataLoading,
  } = useStore();

  const featuredProducts = products.filter((p) => p.featured || p.availability === 'Available').slice(0, 8);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1931] via-[#0d2142] to-[#0a1931] text-white pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-amber-400/20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Premier E-Commerce & Services in Owerri</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-[#d4af37]">
                  {settings.storeName}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {settings.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button onClick={() => onNavigate('shop')} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#d4af37] text-[#0a1931] font-bold text-sm shadow-lg shadow-amber-400/20 hover:scale-[1.02] hover:shadow-amber-400/30 active:scale-95 transition flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </button>
                <button onClick={() => onNavigate('services')} className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/15 active:scale-95 transition flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Explore Services</span>
                </button>
                <button onClick={() => onNavigate('contact')} className="px-5 py-3.5 rounded-xl bg-white/5 text-slate-200 font-medium text-sm hover:bg-white/10 active:scale-95 transition flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Contact Us</span>
                </button>
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-3.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium text-sm hover:bg-blue-600/30 active:scale-95 transition flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span>Visit Facebook</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Direct WhatsApp Inquiries:</span>
                <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-bold underline flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>08109226976</span>
                </a>
              </div>
            </div>

            {/* FIXED PHOTO - FULL CIRCLE */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/15 to-white/5 p-6 border border-white/15 backdrop-blur-md shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-800 flex items-center justify-center group">
                    <img
                      src={christianImg}
                      alt="Christian Akobundu - Founder"
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                    {isAdmin && (
                      <button onClick={() => onNavigate('admin', { tab: 'settings' })} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-amber-300 text-xs font-medium rounded-full">
                        <Camera className="w-5 h-5 mb-1" />
                        <span>Update Photo</span>
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                      <span>Christian Akobundu</span>
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                    </h3>
                    <p className="text-xs text-amber-300 font-medium tracking-wide">Founder & CEO</p>
                    <p className="text-xs text-slate-300 flex items-center justify-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{settings.location}</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-3 bg-black/20 p-3 rounded-xl border border-white/5">
                    &ldquo;I created chrisAkons online store to provide an accessible platform where customers can explore products, discover services, and connect directly.&rdquo;
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <button onClick={() => onNavigate('about')} className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1">
                      <span>Read Full Bio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Browse Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931]">Featured Products</h2>
            <p className="text-sm text-slate-600 mt-1">Genuine items with transparent Naira pricing and direct WhatsApp ordering.</p>
          </div>
          <button onClick={() => onNavigate('shop')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a1931] hover:text-amber-600 transition self-start sm:self-auto">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0a1931] mb-2">No Products Added Yet</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">Christian Akobundu will upload products to the catalogue shortly. You can still reach out directly on WhatsApp to inquire about any items!</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
              {isAdmin && (
                <button onClick={() => onNavigate('admin', { tab: 'products' })} className="px-6 py-3 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-semibold text-sm shadow-md transition flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add First Product</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={() => onNavigate('product-detail', { id: product.id })} onAddToCart={() => addToCart(product, 1)} />
            ))}
          </div>
        )}
      </section>

      {/* Services */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Expert Solutions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931]">Our Services</h2>
              <p className="text-sm text-slate-600 mt-1">Professional and reliable services delivered with integrity in Imo State.</p>
            </div>
            <button onClick={() => onNavigate('services')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a1931] hover:text-amber-600 transition self-start sm:self-auto">
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {services.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center max-w-xl mx-auto">
              <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">Services Available Upon Request</h3>
              <p className="text-xs text-slate-500 mb-5">Contact Christian directly on WhatsApp to inquire about technical services, procurement, and repairs.</p>
              <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200 overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-3">
                    {service.images && service.images[0] && <img src={service.images[0]} alt={service.name} className="w-full h-44 object-cover rounded-xl mb-4" />}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{service.category || 'General Service'}</span>
                      {service.price && <span className="text-sm font-bold text-[#0a1931]">{service.price}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-[#0a1931]">{service.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{service.shortDesc}</p>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button onClick={() => onNavigate('service-detail', { id: service.id })} className="text-xs font-semibold text-[#0a1931] hover:text-amber-600">Learn More</button>
                    <a href={`https://wa.me/2348109226976?text=${encodeURIComponent(`Hello Christian, I would like to request this service: ${service.name}`)}`} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Request Service</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Owner - FIXED SECOND CIRCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0a1931] text-white p-8 sm:p-12 border border-amber-400/20 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Meet the Owner</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Christian Akobundu — Owerri, Imo State</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">{settings.bio}</p>
              <div className="flex
