import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Check,
  Share2,
  Tag,
  Box,
  HelpCircle,
  Plus,
  Minus,
  MapPin,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira, createProductWhatsAppMessage } from '../utils/format';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
}) => {
  const { products, addToCart, settings } = useStore();
  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          This product might have been removed or the link is incorrect.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 rounded-xl bg-[#0a1931] text-white text-sm font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop</span>
        </button>
      </div>
    );
  }

  // Gallery array
  const allImages = [
    product.mainImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);
  const currentImage = selectedImage || product.mainImage || '';

  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
  const currentPrice = hasDiscount ? product.discountedPrice! : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
    : 0;

  const whatsAppOrderUrl = createProductWhatsAppMessage(
    product.name,
    currentPrice,
    quantity
  );

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${product.name} - chrisAkons online store`,
          text: `Check out ${product.name} at chrisAkons online store (Owerri, Nigeria)!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      // User dismissed share dialog
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 hover:text-[#0a1931] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 hover:text-[#0a1931] transition px-2.5 py-1 rounded-md bg-slate-100"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Product</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full h-80 sm:h-[460px] rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-all duration-300"
              />
            ) : (
              <div className="text-center text-slate-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-2 opacity-30" />
                <span>No image available</span>
              </div>
            )}

            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm ${
                  product.availability === 'Available'
                    ? 'bg-emerald-600 text-white'
                    : product.availability === 'Pre-order'
                    ? 'bg-amber-500 text-[#0a1931]'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {product.availability}
              </span>

              {hasDiscount && (
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-md">
                  SAVE {discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails if multiple images */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    currentImage === img
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" />
              <span>{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931] tracking-tight">
              {product.name}
            </h1>

            {product.sku && (
              <p className="text-xs text-slate-400 mt-1">
                SKU: <span className="font-mono text-slate-600">{product.sku}</span>
              </p>
            )}
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline gap-3">
            <span className="text-3xl font-black text-[#0a1931]">
              {formatNaira(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-base text-slate-400 line-through">
                {formatNaira(product.price)}
              </span>
            )}
            <span className="text-xs text-slate-500 ml-auto font-medium">
              Currency: ₦ Naira
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Quantity:
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-bold text-sm text-slate-900 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Subtotal: <strong className="text-slate-900">{formatNaira(currentPrice * quantity)}</strong>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* WhatsApp Order Button */}
            <a
              href={whatsAppOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              <span>Order on WhatsApp (Instant Inquiry)</span>
            </a>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0a1931] hover:bg-[#152e55] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Add to Cart ({quantity})</span>
            </button>

            {addedToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in">
                <span>Added to cart! Total items ready in cart.</span>
                <button
                  onClick={() => onNavigate('cart')}
                  className="underline hover:text-emerald-950 font-bold ml-2"
                >
                  View Cart
                </button>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Ships from <strong>{settings.location}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Waybill and door-to-door delivery arranged across Nigeria</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verified direct contact with store owner Christian Akobundu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Specifications & Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#0a1931] flex items-center gap-2">
            <Box className="w-5 h-5 text-amber-500" />
            <span>Product Description</span>
          </h3>
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-200">
            {product.description || 'No detailed description provided for this product.'}
          </div>

          {product.specs && (
            <>
              <h3 className="text-lg font-bold text-[#0a1931] pt-4">
                Specifications & Features
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-200">
                {product.specs}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#0a1931] flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-500" />
            <span>Delivery & Ordering Information</span>
          </h3>
          <div className="text-sm text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <p>
              {product.deliveryInfo ||
                'Available for pickup in Owerri, Imo State or nationwide delivery via trusted courier and dispatch services.'}
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">How WhatsApp Ordering Works:</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>Click <strong>Order on WhatsApp</strong> above to send the exact product details to Christian.</li>
                <li>Receive confirmation on stock availability, exact color/variant, and delivery address.</li>
                <li>Finalize payment and receive tracking/dispatch receipt directly.</li>
              </ol>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/2348109226976?text=${encodeURIComponent(
                  `Hello Christian, I have a question regarding product: ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Have a question about this product? Chat with Christian</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
