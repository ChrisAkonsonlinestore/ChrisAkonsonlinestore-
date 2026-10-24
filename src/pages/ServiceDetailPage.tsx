import React from 'react';
import { ArrowLeft, MessageCircle, Wrench, CheckCircle, Tag, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { createServiceWhatsAppMessage } from '../utils/format';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
}) => {
  const { services, settings } = useStore();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          This service may have been updated or removed.
        </p>
        <button
          onClick={() => onNavigate('services')}
          className="px-6 py-2.5 rounded-xl bg-[#0a1931] text-white text-sm font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Services</span>
        </button>
      </div>
    );
  }

  const whatsAppUrl = createServiceWhatsAppMessage(service.name, service.price);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a1931] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Gallery / Images */}
        {service.images && service.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-100 p-2">
            {service.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${service.name} preview ${i + 1}`}
                className="w-full h-72 object-cover rounded-2xl"
              />
            ))}
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {service.category || 'General Service'}
              </span>
              {service.availability && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {service.availability}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1931]">
              {service.name}
            </h1>

            {service.price && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block">
                <span className="text-xs text-slate-400 block font-medium">Estimated Pricing / Rate:</span>
                <span className="text-2xl font-black text-[#0a1931]">
                  {service.price}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0a1931]">Service Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {service.shortDesc}
            </p>
            {service.detailedDesc && (
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line pt-2">
                {service.detailedDesc}
              </div>
            )}
          </div>

          {/* Action Box */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Direct consultation with <strong className="text-slate-900">{settings.ownerName}</strong> in Owerri, Imo State.
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Request This Service on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
