import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Lock, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface LegalPageProps {
  pageType: 'privacy' | 'terms';
  onNavigate: (page: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  const { settings } = useStore();

  if (pageType === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a1931] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931]">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400">
                Last updated: October 2026 &bull; {settings.storeName}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Introduction</h2>
              <p>
                Welcome to <strong>{settings.storeName}</strong>, operated by{' '}
                <strong>Christian Akobundu</strong> located in {settings.location}. We are committed to safeguarding the privacy of our visitors and customers. This Privacy Policy outlines how your personal data is collected, used, and secured when you browse our store, submit contact inquiries, or order via WhatsApp.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
              <p>We collect only necessary information required to fulfill product inquiries and provide services:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Contact Inquiries:</strong> Name, email address, phone number, and message content submitted through our online inquiry form.</li>
                <li><strong>WhatsApp Communications:</strong> Phone number and purchase inquiries sent directly to our official WhatsApp line ({settings.phone}).</li>
                <li><strong>Payment Information:</strong> We do NOT collect or store credit or debit card details on this website. All payments are conducted via verified direct bank transfer or future certified Nigerian payment processors (such as Paystack).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Purpose and Data Usage</h2>
              <p>
                Customer inquiries are stored securely in our private administrative system and accessible exclusively to Christian Akobundu. We never sell, rent, or trade your personal information to third parties or advertising brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Contacting the Data Controller</h2>
              <p>
                If you have questions regarding your data or wish to have your contact details updated, please reach out to Christian Akobundu:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-700">
                <p><strong>Owner:</strong> Christian Akobundu</p>
                <p><strong>Phone:</strong> {settings.phone}</p>
                <p><strong>Email:</strong> {settings.email}</p>
                <p><strong>Address:</strong> {settings.location}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a1931] font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
        {/* Header Block */}
        <div className="pb-6 border-b border-slate-200 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC93C]/20 border border-[#FFC93C] text-xs font-bold text-slate-900">
            <span>Official Store Policy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0a1931] tracking-tight">
            Terms & Conditions
          </h1>
          <div className="text-xs text-slate-500 space-y-0.5 pt-1">
            <p className="font-semibold text-slate-700">CHRISAKONS ONLINE STORE - TERMS AND CONDITIONS</p>
            <p>Last Updated: October 24, 2026</p>
            <p>Owner: Christian Akobundu &bull; Location: Owerri, Imo State, Nigeria</p>
          </div>
        </div>

        {/* Intro */}
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          Welcome to ChrisAkons Online Store. By accessing our website, placing an order, or doing business with us on any platform (Website, WhatsApp, Instagram etc), you agree to these Terms and Conditions.
        </p>

        {/* Sections */}
        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              1. OUR BUSINESS MODEL
            </h2>
            <p className="pl-4">
              ChrisAkons Online Store is a retail thrift store. We are sellers of products. We are <strong>NOT</strong> a logistics, dispatch, or delivery company.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-[#FFC93C]/10 border border-[#FFC93C]/40 p-5 rounded-2xl">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              2. PAYMENT POLICY - ESCROW ONLY
            </h2>
            <div className="pl-4 space-y-3">
              <p className="font-medium text-slate-900">
                To protect both buyer and seller from scams and disputes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-800">
                <li>We <strong>ONLY</strong> accept payment via a Secured Escrow Service.</li>
                <li>We do <strong>NOT</strong> accept direct bank transfers, Opay, Palmpay, cash deposit, or any direct payment.</li>
                <li>Do not send money directly to us. Any direct payment will not be recognized.</li>
              </ul>

              <div className="p-4 bg-white rounded-xl border border-[#FFC93C] shadow-sm space-y-2 mt-2">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  All buyers must register and pay through our official Escrow partner:
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-slate-700">Website: </span>
                    <a
                      href="https://escrowvillage.com/user/referrals"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-semibold break-all"
                    >
                      https://escrowvillage.com/user/referrals
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Referral Username: </span>
                    <strong className="text-slate-950 font-black px-2 py-0.5 bg-[#FFC93C]/30 rounded">ChrisAkons001</strong>
                  </p>
                </div>
                <p className="text-xs text-slate-600 pt-1">
                  Click the link, create an account, and use <strong className="text-slate-900 font-bold">ChrisAkons001</strong> as referral username to get registered on Escrow. Only payments made through Escrow Village with this referral will be accepted.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              3. ESCROW AND DELIVERY FEES
            </h2>
            <div className="pl-4 space-y-1.5">
              <p>All Escrow service charges are to be borne by the Buyer.</p>
              <p>All delivery, logistics, dispatch rider, and waybill fees are to be borne by the Buyer.</p>
              <p className="text-xs text-slate-500 font-medium">These fees are separate from the product price and will be added at checkout.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              4. DELIVERY PROCESS
            </h2>
            <div className="pl-4 space-y-1.5">
              <p>
                Once payment is secured in Escrow, we will package your product and hand it over to your preferred logistics company or dispatch rider.
              </p>
              <p>
                Our responsibility is to give you the exact product you ordered, in good condition, to the logistics company.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-amber-50/60 p-5 rounded-2xl border border-amber-200">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              5. RISK IN TRANSIT - IMPORTANT
            </h2>
            <div className="pl-4 space-y-2">
              <p>
                Once your order leaves our store and is handed to the logistics company: We have no control over what happens on the road — accidents, loss, theft, damage, or delays can happen.
              </p>
              <p className="font-semibold text-slate-900">
                If your product is lost, damaged, destroyed, or stolen in transit by the logistics company:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-800">
                <li>ChrisAkons Online Store is <strong>NOT</strong> liable or responsible.</li>
                <li>You the buyer bear full risk for any issue that happens during transit.</li>
                <li>We will <strong>NOT</strong> refund, replace, or compensate for products lost, damaged, or stolen by the delivery company.</li>
                <li>You agree <strong>NOT</strong> to hold ChrisAkons Online Store liable for any delivery failure or transit mishap.</li>
              </ul>
              <p className="font-semibold text-slate-900 pt-1">
                By ordering from us, you accept this risk unconditionally.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              6. INSPECTION AND COMPLAINTS
            </h2>
            <div className="pl-4 space-y-1.5">
              <p>Inspect your product immediately upon receipt from the logistics company.</p>
              <p>Any complaints must be reported within 24 hours of receiving your delivery.</p>
              <p className="font-semibold text-rose-700">Complaints after 24 hours will NOT be attended to.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              7. NO RETURNS AND NO REFUNDS
            </h2>
            <div className="pl-4 space-y-1.5">
              <p>
                All sales are final. Because we are a thrift retail store, we do <strong>NOT</strong> accept returns, exchanges, or refunds once a product has been delivered and inspected.
              </p>
              <p>
                Please ask all questions and verify specifications before placing your order.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-[#FFC93C] pl-3">
              8. ACCEPTANCE OF TERMS
            </h2>
            <div className="pl-4 space-y-1.5">
              <p>
                By making a purchase, creating an escrow transaction, or interacting with ChrisAkons Online Store, you confirm that you have read, understood, and agreed to every single clause in these Terms and Conditions.
              </p>
              <p className="font-semibold text-rose-700">
                If you do not agree with any part of these terms, please do NOT place an order with us.
              </p>
            </div>
          </section>

          {/* Store Owner Details */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mt-4 text-xs sm:text-sm">
            <div className="border-t border-slate-200 pt-3">
              <p><strong>Owner:</strong> Christian Akobundu</p>
              <p><strong>Store:</strong> ChrisAkons Online Store, Owerri, Imo State, Nigeria</p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:08109226976" className="text-slate-800 hover:underline">08109226976</a>
                {' | '}
                <strong>WhatsApp:</strong>{' '}
                <a href="https://wa.me/2348109226976" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">2348109226976</a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:christianakobundu09@gmail.com" className="text-slate-800 hover:underline">christianakobundu09@gmail.com</a>
              </p>
              <p className="pt-2 text-xs text-slate-500">
                Official Escrow Partner: <a href="https://escrowvillage.com/user/referrals" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">https://escrowvillage.com/user/referrals</a> | Referral: <strong className="text-slate-950 font-bold">ChrisAkons001</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
