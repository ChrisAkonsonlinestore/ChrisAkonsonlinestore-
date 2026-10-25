import React from 'react';
import { Phone, BadgeCheck, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

const christianImg = '/christian-final.jpg';

const HomePage: React.FC = () => {
  const settings = {
    bio: "My name is Christian Akobundu, based in Owerri, Imo State, Nigeria. I created chrisAkons online store to provide accessible online platform where customers can explore products, discover services, and connect directly.",
    phone: "08109226976",
    whatsapp: "2348109226976"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0B1426] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">Meet The Owner</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] mt-2">Christian Akobundu — <br/>Owerri, Imo State</h1>
            <p className="text-[14px] leading-6 text-slate-300/90 mt-5 max-w-[58ch] font-light">{settings.bio}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="/about" className="bg-amber-400 text-black px-6 py-3 rounded-full text-sm font-bold">Read Owner Profile & Story</a>
              <a href={`tel:${settings.phone}`} className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}</a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Verified Owner</span>
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-amber-400" /> Owerri Delivery</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-400" /> Trusted</span>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden border-[5px] border-amber-400 shadow-2xl bg-slate-800">
              <img src={christianImg} alt="Christian Akobundu" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Products</h2>
        <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto">Christian Akobundu will upload products to the catalogue shortly. You can still reach out directly on WhatsApp!</p>
        <div className="flex justify-center gap-3 mt-6">
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold">Chat on WhatsApp</a>
          <a href="/shop" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">Visit Shop <ArrowRight className="w-4 h-4" /></a>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0B1426] rounded-[2.5rem] p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center border border-slate-800/50">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">Meet The Owner</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Christian Akobundu — <br/>Owerri, Imo State</h2>
              <p className="text-[14px] text-slate-300 leading-6 font-light mt-5">{settings.bio}</p>
              <div className="flex flex-wrap gap-3 mt-7">
                <a href="/about" className="bg-amber-400 text-black px-6 py-3 rounded-full text-sm font-bold">Read Owner Profile & Story</a>
                <a href={`tel:${settings.phone}`} className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}</a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-800">
                <img src={christianImg} alt="Christian Akobundu - Owner" className="w-full h-full object-cover object-top rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProductCard = () => null;
export { HomePage };
export default HomePage;
