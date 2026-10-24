import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { createGeneralWhatsAppMessage } from '../utils/format';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {showTooltip && (
        <div className="bg-[#0a1931] text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-2 max-w-[220px] animate-bounce">
          <span>Need help or want to order? Chat with Christian!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-white"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={createGeneralWhatsAppMessage()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white focus:outline-none"
        title="Chat with Christian on WhatsApp (08109226976)"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
};
