import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageCircle, Phone, BadgeCheck, Truck, ArrowRight, Eye, ShoppingBag, MessageCircle as MessageCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getProducts, getSiteSettings } from '../services/firestoreService';
import christianImg from '../assets/christian.jpg';

const formatNaira = (price: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
};

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<any>({
    bio: "My name is Christian Akobundu, based in Owerri, Imo State, Nigeria. I created chrisAkons online store to provide accessible online platform where customers can explore products, discover services, and connect directly. This platform is designed to make browsing convenient, product discovery simple, and customer communication straightforward. Thank you for visiting. I look forward to connecting with you.",
    phone: "08109226976",
    whatsapp: "2348109226976"
  });

  useEffect(() => {
    const load = async () => {
      const prods = await getProducts();
      setProducts(prods);
      const siteSettings = await getSiteSettings();
      if (siteSettings) setSettings(siteSettings);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0B1426] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">Meet The Owner</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] mt-2">Christian Akobundu — <br/>Owerri, Imo State</h1>
            <p className="text-[14px] leading-6 text-slate-300/90 mt-5 max-w-[58ch] font-light">{settings.bio}</p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link to="/about" className="bg-amber-400 text-black px-6 py-3 rounded-full text-sm font-bold">Read Owner Profile & Story</Link>
              <a href={`tel:${settings.phone}`} className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}</a>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden border-[5px] border-amber-400 shadow-2xl bg-slate-800">
              <img src={christianImg} alt="Christian Akobundu" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Products</h2>
          <p className="text-sm text-slate-600 mt-3">Christian Akobundu will upload products to the catalogue shortly. You can still reach out directly on WhatsApp to inquire about any items, gadgets, or custom orders!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={() => window.location.href = `/product/${product.id}`} onAddToCart={() => {}} />
          ))}
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
                <Link to="/about" className="bg-amber-400 text-black px-6 py-3 rounded-full text-sm font-bold">Read Owner Profile & Story</Link>
                <a href={`tel:${settings.phone}`} className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}</a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-800">
                <img src={christianImg} alt="Christian Akobundu - Owner of chrisAkons Store" className="w-full h-full object-cover object-top rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onViewDetails: () => void; onAddToCart: () => void; }> = ({ product, onViewDetails, onAddToCart }) => {
  const currentPrice = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const whatsappUrl = `https://wa.me/2348109226976?text=Hi%20Christian,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`;
  return (
    <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div className="aspect-square bg-slate-50 p-3">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" onClick={onViewDetails} />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 onClick={onViewDetails} className="font-bold text-base text-slate-900 line-clamp-1 cursor-pointer">{product.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 flex-1">{product.description}</p>
        <div className="pt-2 flex items-baseline gap-2">
          <span className="text-lg font-black text-[#0a1931]">{formatNaira(currentPrice)}</span>
          {hasDiscount && <span className="text-xs text-slate-400 line-through">{formatNaira(product.price)}</span>}
        </div>
      </div>
      <div className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onViewDetails} className="py-2 px-2.5 rounded-xl border border-slate-300 text-xs font-bold flex items-center justify-center gap-1.5"><Eye className="w-3.5 h-3.5" />Details</button>
          <button onClick={onAddToCart} className="py-2 px-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5 text-amber-400" />Add to Cart</button>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"><MessageCircleIcon className="w-4 h-4" />Order on WhatsApp</a>
      </div>
    </div>
  );
};

export default HomePage;
