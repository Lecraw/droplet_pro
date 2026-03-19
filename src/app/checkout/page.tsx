"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useShopStore } from "@/store/useShopStore";
import { ArrowLeft, CheckCircle, Package, Truck, CreditCard, Building2 } from "lucide-react";

type Step = "review" | "shipping" | "payment" | "confirm";

export default function CheckoutPage() {
  const { cart, clearCart } = useShopStore();
  const [step, setStep] = useState<Step>("review");
  const [shipping, setShipping] = useState({ name: "", company: "", address: "", city: "", zip: "", country: "US" });
  const [payment, setPayment] = useState({ method: "card", po: "" });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const steps: Step[] = ["review", "shipping", "payment", "confirm"];
  const stepIdx = steps.indexOf(step);

  const handleConfirm = () => {
    clearCart();
    setStep("confirm");
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#0F172A] mb-2">Order Confirmed</h1>
          <p className="text-[#64748B] text-sm mb-2">Order #DRP-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Your hardware order has been received. Our fulfillment team will contact you within 1 business day with shipping details.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3.5 rounded-xl text-center transition-colors">
              Go to Dashboard
            </Link>
            <Link href="/shop" className="block w-full border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#94A3B8] py-3.5 rounded-xl text-center text-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-[#94A3B8] hover:text-[#0066FF] mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>

        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#0F172A]">Checkout</h1>
          <p className="text-[#64748B] text-sm mt-1">Complete your hardware order</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-10">
          {steps.filter(s => s !== "confirm").map((s, i, arr) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${stepIdx >= i ? "text-[#0066FF]" : "text-[#94A3B8]"}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                  stepIdx > i ? "bg-[#0066FF] border-[#0066FF] text-white" :
                  stepIdx === i ? "border-[#0066FF] text-[#0066FF]" :
                  "border-[#E2E8F0] text-[#94A3B8]"
                }`}>{stepIdx > i ? "✓" : i + 1}</div>
                <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest capitalize hidden sm:block">{s}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`w-16 h-px mx-3 transition-all ${stepIdx > i ? "bg-[#0066FF]" : "bg-[#E2E8F0]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "review" && (
                <motion.div key="review" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E2E8F0]">
                    <p className="font-bold text-[#0F172A] flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#0066FF]" /> Order Review
                    </p>
                  </div>
                  <div className="divide-y divide-[#F0F4F8]">
                    {cart.map((item) => (
                      <div key={item.id} className="px-6 py-4 flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-center p-2 shrink-0">
                          <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F172A] text-sm">{item.name}</p>
                          {item.selectedOptions && Object.entries(item.selectedOptions).map(([k, v]) => (
                            <p key={k} className="text-[10px] font-[family-name:var(--font-mono)] text-[#94A3B8] uppercase tracking-wider">{k}: {v}</p>
                          ))}
                          <p className="text-xs text-[#94A3B8] mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[#0F172A]">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  {cart.length === 0 && (
                    <div className="px-6 py-12 text-center text-[#94A3B8]">
                      <p>Your cart is empty.</p>
                      <Link href="/shop" className="text-[#0066FF] text-sm mt-2 inline-block">Browse hardware →</Link>
                    </div>
                  )}
                  {cart.length > 0 && (
                    <div className="px-6 py-4 border-t border-[#E2E8F0]">
                      <button onClick={() => setStep("shipping")}
                        className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3.5 rounded-xl transition-colors">
                        Continue to Shipping →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#E2E8F0]">
                    <p className="font-bold text-[#0F172A] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#0066FF]" /> Shipping Details
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", key: "name", placeholder: "Jane Smith", full: false },
                        { label: "Company", key: "company", placeholder: "Hyperscale Inc.", full: false },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                          <label className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1.5">{label}</label>
                          <input
                            value={shipping[key as keyof typeof shipping]}
                            onChange={(e) => setShipping(s => ({ ...s, [key]: e.target.value }))}
                            placeholder={placeholder}
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    {[
                      { label: "Street Address", key: "address", placeholder: "1 Data Center Way" },
                      { label: "City", key: "city", placeholder: "Ashburn" },
                      { label: "ZIP / Postal Code", key: "zip", placeholder: "20147" },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1.5">{label}</label>
                        <input
                          value={shipping[key as keyof typeof shipping]}
                          onChange={(e) => setShipping(s => ({ ...s, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                        />
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep("review")} className="flex-1 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] py-3 rounded-xl text-sm transition-colors">← Back</button>
                      <button onClick={() => setStep("payment")} className="flex-1 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3 rounded-xl transition-colors">Continue to Payment →</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#E2E8F0]">
                    <p className="font-bold text-[#0F172A] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#0066FF]" /> Payment
                    </p>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Payment method toggle */}
                    <div className="flex gap-3">
                      {[
                        { key: "card", icon: <CreditCard className="w-4 h-4" />, label: "Credit Card" },
                        { key: "po", icon: <Building2 className="w-4 h-4" />, label: "Purchase Order" },
                      ].map(({ key, icon, label }) => (
                        <button key={key} onClick={() => setPayment(p => ({ ...p, method: key }))}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                            payment.method === key
                              ? "border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]"
                              : "border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]"
                          }`}>
                          {icon}{label}
                        </button>
                      ))}
                    </div>

                    {payment.method === "card" ? (
                      <div className="space-y-4">
                        {[
                          { label: "Card Number", placeholder: "•••• •••• •••• ••••" },
                          { label: "Cardholder Name", placeholder: "Jane Smith" },
                        ].map(({ label, placeholder }) => (
                          <div key={label}>
                            <label className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1.5">{label}</label>
                            <input placeholder={placeholder}
                              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all" />
                          </div>
                        ))}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Expiry", placeholder: "MM / YY" },
                            { label: "CVV", placeholder: "•••" },
                          ].map(({ label, placeholder }) => (
                            <div key={label}>
                              <label className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1.5">{label}</label>
                              <input placeholder={placeholder}
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1.5">PO Number</label>
                        <input value={payment.po} onChange={(e) => setPayment(p => ({ ...p, po: e.target.value }))}
                          placeholder="PO-2026-00000"
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all font-[family-name:var(--font-mono)]" />
                        <p className="text-xs text-[#94A3B8] mt-2">Net-30 terms available for enterprise accounts. Contact sales for details.</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep("shipping")} className="flex-1 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] py-3 rounded-xl text-sm transition-colors">← Back</button>
                      <button onClick={handleConfirm}
                        className="flex-2 flex-1 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_28px_rgba(0,102,255,0.35)]">
                        Place Order ${total.toLocaleString()} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
              <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-4">Order Summary</p>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#64748B] truncate mr-2">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-[#0F172A] shrink-0">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#F0F4F8] pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal</span>
                  <span className="font-medium text-[#0F172A]">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-[#F0F4F8] pt-2 mt-1">
                  <span className="text-[#0F172A]">Total</span>
                  <span className="text-[#0F172A] font-[family-name:var(--font-display)]">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-4">
              <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-3">Included</p>
              <ul className="space-y-2">
                {["Free expedited shipping", "5-year hardware warranty", "24/7 technical support", "Droplet Platform access"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="w-1 h-1 rounded-full bg-[#0066FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
