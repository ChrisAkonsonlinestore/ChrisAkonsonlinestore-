import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ContactPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { settings, sendInquiry } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMessage('Please type your inquiry or message.');
      return;
    }

    try {
      setIsSubmitting(true);
      const inqPayload: Record<string, any> = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      };
      if (phone.trim()) inqPayload.phone = phone.trim();
      if (subject.trim()) inqPayload.subject = subject.trim();

      await sendInquiry(inqPayload as any);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Failed to submit inquiry. Please chat directly on WhatsApp!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>We're Here to Help</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a1931] tracking-tight">
          Contact chrisAkons online store
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-light">
          Get in touch with Christian Akobundu in Owerri, Imo State, Nigeria for product inquiries, bulk orders, and service requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Details Cards & Clickable Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a1931] text-white p-8 rounded-3xl border border-amber-400/20 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-5 bg-amber-400 rounded-full"></span>
              Store & Owner Information
            </h2>

            <div className="space-y-5 text-sm">
              {/* Owner & Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Founder & CEO</span>
                  <strong className="text-white text-base block">{settings.ownerName}</strong>
                  <span className="text-slate-300 text-xs">{settings.location}</span>
                </div>
              </div>

              {/* Phone Link */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block font-medium">Phone Call</span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-amber-300 hover:text-amber-200 text-base font-bold underline block"
                  >
                    {settings.phone}
                  </a>
                  <span className="text-[11px] text-slate-400">Tap to call directly</span>
                </div>
              </div>

              {/* Email Link */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-slate-200 hover:text-white text-sm font-semibold break-all underline block"
                  >
                    {settings.email}
                  </a>
                  <span className="text-[11px] text-slate-400">Tap to send email</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Operating Schedule</span>
                  <span className="text-slate-200 text-xs block">Monday – Saturday: 8:00 AM – 7:00 PM</span>
                  <span className="text-emerald-400 text-xs font-semibold">WhatsApp Messages: 24/7 Priority</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button Grid */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (Fastest Response)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call 08109226976</span>
                </a>

                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-400/30 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0a1931]">
                Send an Online Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your message is sent privately to Christian Akobundu's dashboard. You can also forward it directly to WhatsApp below.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting chrisAkons online store. Christian Akobundu has received your inquiry and will reach out to you shortly.
                </p>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/2348109226976?text=${encodeURIComponent(
                      `Hello Christian, I just submitted an inquiry on your store website and wanted to follow up directly here.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emeka Okafor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Product inquiry, Service request..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe what product you are interested in, questions regarding delivery in Owerri or interstate dispatch..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-500">
                    * Inquiries are kept strictly confidential.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
