import React, { useRef } from 'react';
import christianImg from "../../public/IMG-20261024-WA6654.jpg";
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Camera,
  CheckCircle,
  Award,
  Users,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { compressImageFile } from '../utils/format';

interface AboutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings, isAdmin, saveSettings } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await compressImageFile(file);
      await saveSettings({ profileImageUrl: dataUrl });
    } catch (err: any) {
      alert(err.message || 'Failed to upload photo');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About chrisAkons online store</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a1931] tracking-tight">
          Dedicated to Quality & Direct Convenience
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-light">
          Connecting buyers in Owerri, Imo State, and nationwide with genuine merchandise, specialized services, and transparent personal communication.
        </p>
      </div>

      {/* Main Feature: Meet the Owner — Christian Akobundu */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl bg-gradient-to-br from-[#0a1931] to-[#162e54] group">
              <img
                src={christianImg}
                alt="Christian Akobundu"
                className="w-full h-full object-cover rounded-full"
              />

              {/* Upload Overlay (if Admin) */}
              {isAdmin && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-amber-300 gap-2 cursor-pointer rounded-full"
                  title="Upload / Replace Profile Photo"
                >
                  <Camera className="w-8 h-8" />
                  <span className="text-xs font-bold">Replace Photo</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePhotoUpload}
              accept="image/*"
              className="hidden"
            />

            {isAdmin && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1931] text-xs font-semibold flex items-center gap-2 transition"
              >
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Upload Profile Photo</span>
              </button>
            )}

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Founder & CEO
              </span>
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Meet the Owner
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931]">
                {settings.ownerName}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1 font-medium">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{settings.location}</span>
              </div>
            </div>

            {/* Official Bio Text */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-base leading-relaxed whitespace-pre-line italic">
              &ldquo;{settings.bio}&rdquo;
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect on WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="px-5 py-3 rounded-xl bg-[#0a1931] hover:bg-[#152e55] text-white font-semibold text-xs shadow-md transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {settings.phone}</span>
              </a>

              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 border border-blue-200 font-semibold text-xs transition flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Facebook Profile</span>
              </a>
            </div>

            {isAdmin && (
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin', { tab: 'settings' })}
                  className="text-xs text-amber-600 hover:underline font-bold"
                >
                  Edit owner name, location, and bio in Admin Dashboard &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pillars of chrisAkons Store */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0a1931]">Uncompromising Quality</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every product and service presented on chrisAkons online store is selected and verified directly. No counterfeit or misrepresented merchandise.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0a1931]">Direct WhatsApp Ordering</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminating impersonal bots and slow email ticketing. You communicate directly with Christian to verify product specifications, payment details, and dispatch times.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0a1931]">Based in Owerri, Serving Nigeria</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Convenient local pickup and delivery within Imo State, paired with secure interstate waybill shipping to Lagos, Abuja, Port Harcourt, Enugu, and all Nigerian states.
          </p>
        </div>
      </div>
    </div>
  );
};
