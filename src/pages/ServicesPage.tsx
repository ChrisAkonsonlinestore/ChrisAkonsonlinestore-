import React from 'react';
import {
  Wrench,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle,
  Sparkles,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { createServiceWhatsAppMessage } from '../utils/format';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, settings, isAdmin } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <Wrench className="w-3.5 h-3.5" />
            <span>Professional Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1931]">
            Our Services
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Explore dedicated services provided with quality and personal accountability by Christian Akobundu in Owerri, Imo State, Nigeria.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onNavigate('admin', { tab: 'services' })}
            className="px-5 py-2.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white text-xs font-bold shadow-md transition flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Services List / Empty State */}
      {services.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-4">
            <Wrench className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0a1931] mb-2">
            No Services Listed Yet
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            Christian Akobundu will publish available services here shortly. Need a custom service, technical assistance, or procurement consultation right now?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/2348109226976?text=${encodeURIComponent(
                'Hello Christian, I visited chrisAkons online store and would like to ask about the services you offer.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            {isAdmin && (
              <button
                onClick={() => onNavigate('admin', { tab: 'services' })}
                className="px-5 py-2.5 rounded-xl bg-[#0a1931] text-white font-semibold text-xs transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add First Service</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onLearnMore={() => onNavigate('service-detail', { id: service.id })}
            />
          ))}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0a1931] to-[#12284c] text-white p-8 sm:p-10 border border-amber-400/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need a Custom Request or Consultation?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Christian is available directly on WhatsApp to answer inquiries, provide project quotes, and coordinate deliveries across Imo State and nationwide.
          </p>
        </div>

        <a
          href={`https://wa.me/2348109226976?text=${encodeURIComponent(
            'Hello Christian, I have a custom inquiry regarding your services at chrisAkons online store.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-md transition flex items-center gap-2 shrink-0"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export const ServiceCard: React.FC<{
  service: ServiceItem;
  onLearnMore: () => void;
}> = ({ service, onLearnMore }) => {
  const whatsAppUrl = createServiceWhatsAppMessage(service.name, service.price);
  const mainImage = service.images && service.images[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {mainImage ? (
          <div
            onClick={onLearnMore}
            className="w-full h-52 bg-slate-100 overflow-hidden cursor-pointer"
          >
            <img
              src={mainImage}
              alt={service.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div
            onClick={onLearnMore}
            className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 cursor-pointer"
          >
            <Wrench className="w-10 h-10 opacity-30" />
          </div>
        )}

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {service.category || 'General Service'}
            </span>
            {service.availability && (
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {service.availability}
              </span>
            )}
          </div>

          <h3
            onClick={onLearnMore}
            className="text-lg font-bold text-[#0a1931] hover:text-amber-700 transition cursor-pointer"
          >
            {service.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {service.shortDesc}
          </p>

          {service.price && (
            <div className="pt-2">
              <span className="text-xs text-slate-400 block font-medium">Rate / Pricing:</span>
              <span className="text-base font-bold text-[#0a1931]">
                {service.price}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 space-y-2 border-t border-slate-100 mt-2">
        <div className="pt-4 flex items-center justify-between gap-2">
          <button
            onClick={onLearnMore}
            className="text-xs font-semibold text-[#0a1931] hover:text-amber-600 flex items-center gap-1 transition"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Service</span>
          </a>
        </div>
      </div>
    </div>
  );
};
