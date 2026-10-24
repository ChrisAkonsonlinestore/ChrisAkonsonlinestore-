import React from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira, createCartWhatsAppMessage } from '../utils/format';

interface CartPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    cartTotal,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    settings,
  } = useStore();

  const cartWhatsAppUrl = createCartWhatsAppMessage(
    cart.map((item) => ({
      name: item.product.name,
      price: item.product.discountedPrice || item.product.price,
      quantity: item.quantity,
    })),
    cartTotal
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shopping Cart</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1931]">
            Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review your selected products and checkout directly via WhatsApp with Christian Akobundu.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all items from your cart?')) {
                clearCart();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm space-y-5">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0a1931]">
              Your Cart is Empty
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Explore our catalogue to discover quality products, devices, and accessories in Owerri, Imo State.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      ) : (
        /* Cart Items & Summary Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table / Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
              {cart.map((item) => {
                const currentPrice =
                  item.product.discountedPrice || item.product.price;
                const itemSubtotal = currentPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
                  >
                    {/* Image & Product info */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div
                        onClick={() =>
                          onNavigate('product-detail', { id: item.product.id })
                        }
                        className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
                      >
                        {item.product.mainImage ? (
                          <img
                            src={item.product.mainImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ShoppingBag className="w-6 h-6 opacity-30" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                          {item.product.category}
                        </span>
                        <h3
                          onClick={() =>
                            onNavigate('product-detail', { id: item.product.id })
                          }
                          className="font-bold text-sm sm:text-base text-slate-900 hover:text-amber-700 transition cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-slate-500 font-medium">
                          Unit Price: <strong className="text-slate-800">{formatNaira(currentPrice)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Quantity pill */}
                      <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-inner">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 text-slate-600 hover:bg-slate-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3.5 font-bold text-xs text-slate-800 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 text-slate-600 hover:bg-slate-200 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-slate-400 block font-medium">
                          Subtotal
                        </span>
                        <span className="text-base font-extrabold text-[#0a1931]">
                          {formatNaira(itemSubtotal)}
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back to shop */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0a1931] font-semibold transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping & Add More</span>
              </button>
            </div>
          </div>

          {/* Cart Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#0a1931] pb-4 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-900">
                    {formatNaira(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Currency</span>
                  <span className="font-semibold text-slate-900">
                    ₦ Nigerian Naira
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Estimated Total
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Excludes delivery (confirmed on WhatsApp)
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#0a1931]">
                    {formatNaira(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Secured Escrow Village Info Box */}
              <div className="p-4 rounded-2xl bg-[#FFC93C]/20 border-2 border-[#FFC93C] text-xs text-slate-900 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-950 text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Secured Payment via Escrow Village</span>
                </div>
                <p className="leading-relaxed text-slate-850">
                  Register here:{' '}
                  <a
                    href="https://escrowvillage.com/user/referrals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 underline font-semibold break-all"
                  >
                    https://escrowvillage.com/user/referrals
                  </a>
                  {' | '}
                  Referral: <strong className="font-black text-slate-950 px-1.5 py-0.5 bg-[#FFC93C]/50 rounded">ChrisAkons001</strong>
                </p>
                <div className="pt-0.5 text-[11px] font-bold text-amber-900">
                  Escrow ONLY &bull; No direct transfer
                </div>
              </div>

              {/* Explicit Stock & Inquiry Notice required by user */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Notice Before Checkout:</span>
                </div>
                <p className="leading-relaxed text-[11px] text-amber-800">
                  Submitting your cart sends your inquiry directly to Christian Akobundu on WhatsApp. This inquiry does <strong>not guarantee immediate stock reservation</strong> until Christian confirms availability and payment/delivery instructions with you.
                </p>
              </div>

              {/* Checkout Button */}
              <a
                href={cartWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                <span>Checkout via WhatsApp</span>
              </a>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                You will be redirected to WhatsApp to send Christian your itemized order.
              </div>
            </div>

            {/* Support guarantee */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Personal Support</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Have special requirements or custom quantities? Christian is on standby to assist with bulk pricing and fast waybill shipping.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
