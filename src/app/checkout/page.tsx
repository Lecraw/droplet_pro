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
      <div className="min-h-screen bg-[#060B18] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#00E5A0]/10 border border-[#00E5A0]/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#00E5A0]" />
          </div>
          <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#F0F4F8] mb-2">Order Confirmed</h1>
          <p className="text-[#8B9DC3] text-sm mb-2">Order #DRP-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-[#8B9DC3] text-sm leading-relaxed mb-8">
            Your hardware order has been received. Our fulfillment team will contact you within 1 business day with shipping details.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard" className="block w-full bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] font-bold py-3.5 rounded-xl text-center transition-colors">
              Go to Dashboard
            </Link>
            <Link href="/shop" className="block w-full border border-white/[0.06] text-[#8B9DC3] hover:text-[#F0F4F8] hover:border-[#4A5B78] py-3.5 rounded-xl text-center text-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060B18] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-widest text-[#4A5B78] hover:text-[#00BFFF] mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>

        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#F0F4F8]">Checkout</h1>
          <p className="text-[#8B9DC3] text-sm mt-1">Complete your hardware order</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-10">
          {steps.filter(s => s !== "confirm").map((s, i, arr) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${stepIdx >= i ? "text-[#00BFFF]" : "text-[#4A5B78]"}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                  stepIdx > i ? "bg-[#00BFFF] border-[#00BFFF] text-[#060B18]" :
                  stepIdx === i ? "border-[#00BFFF] text-[#00BFFF]" :
                  "border-white/[0.06] text-[#4A5B78]"
                }`}>{stepIdx > i ? "✓" : i + 1}</div>
                <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest capitalize hidden sm:block">{s}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`w-16 h-px mx-3 transition-all ${stepIdx > i ? "bg-[#00BFFF]" : "bg-white/[0.1]"}`} />
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
                  className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/[0.06]">
                    <p className="font-bold text-[#F0F4F8] flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#00BFFF]" /> Order Review
                    </p>
                  </div>
                  <div className="divide-y divide-[#F0F4F8]">
                    {cart.map((item) => (
                      <div key={item.id} className="px-6 py-4 flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#060B18] border border-white/[0.06] rounded-xl flex items-center justify-center p-2 shrink-0">
                          <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#F0F4F8] text-sm">{item.name}</p>
                          {item.selectedOptions && Object.entries(item.selectedOptions).map(([k, v]) => (
                            <p key={k} className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#4A5B78] uppercase tracking-wider">{k}: {v}</p>
                          ))}
                          <p className="text-xs text-[#4A5B78] mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[#F0F4F8]">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  {cart.length === 0 && (
                    <div className="px-6 py-12 text-center text-[#4A5B78]">
                      <p>Your cart is empty.</p>
                      <Link href="/shop" className="text-[#00BFFF] text-sm mt-2 inline-block">Browse hardware →</Link>
                    </div>
                  )}
                  {cart.length > 0 && (
                    <div className="px-6 py-4 border-t border-white/[0.06]">
                      <button onClick={() => setStep("shipping")}
                        className="w-full bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] font-bold py-3.5 rounded-xl transition-colors">
                        Continue to Shipping →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] ">
                  <div className="px-6 py-4 border-b border-white/[0.06]">
                    <p className="font-bold text-[#F0F4F8] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#00BFFF]" /> Shipping Details
                    </p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", key: "name", placeholder: "Jane Smith", full: false },
                        { label: "Company", key: "company", placeholder: "Hyperscale Inc.", full: false },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                          <label className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1.5">{label}</label>
                          <input
                            value={shipping[key as keyof typeof shipping]}
                            onChange={(e) => setShipping(s => ({ ...s, [key]: e.target.value }))}
                            placeholder={placeholder}
                            className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all"
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
                        <label className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1.5">{label}</label>
                        <input
                          value={shipping[key as keyof typeof shipping]}
                          onChange={(e) => setShipping(s => ({ ...s, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all"
                        />
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep("review")} className="flex-1 border border-white/[0.06] text-[#8B9DC3] hover:text-[#F0F4F8] py-3 rounded-xl text-sm transition-colors">← Back</button>
                      <button onClick={() => setStep("payment")} className="flex-1 bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] font-bold py-3 rounded-xl transition-colors">Continue to Payment →</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] ">
                  <div className="px-6 py-4 border-b border-white/[0.06]">
                    <p className="font-bold text-[#F0F4F8] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#00BFFF]" /> Payment
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
                              ? "border-[#00BFFF] bg-[#00BFFF]/5 text-[#00BFFF]"
                              : "border-white/[0.06] text-[#8B9DC3] hover:border-[#4A5B78]"
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
                            <label className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1.5">{label}</label>
                            <input placeholder={placeholder}
                              className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all" />
                          </div>
                        ))}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Expiry", placeholder: "MM / YY" },
                            { label: "CVV", placeholder: "•••" },
                          ].map(({ label, placeholder }) => (
                            <div key={label}>
                              <label className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1.5">{label}</label>
                              <input placeholder={placeholder}
                                className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-1.5">PO Number</label>
                        <input value={payment.po} onChange={(e) => setPayment(p => ({ ...p, po: e.target.value }))}
                          placeholder="PO-2026-00000"
                          className="w-full bg-[#060B18] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F0F4F8] focus:outline-none focus:border-[#00BFFF] focus:ring-1 focus:ring-[#00BFFF] transition-all font-[family-name:var(--font-jetbrains)]" />
                        <p className="text-xs text-[#4A5B78] mt-2">Net-30 terms available for enterprise accounts. Contact sales for details.</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep("shipping")} className="flex-1 border border-white/[0.06] text-[#8B9DC3] hover:text-[#F0F4F8] py-3 rounded-xl text-sm transition-colors">← Back</button>
                      <button onClick={handleConfirm}
                        className="flex-2 flex-1 bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,191,255,0.2)] hover:shadow-[0_0_28px_rgba(0,191,255,0.35)]">
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
            <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  p-5">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-4">Order Summary</p>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#8B9DC3] truncate mr-2">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-[#F0F4F8] shrink-0">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/[0.04] pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B9DC3]">Subtotal</span>
                  <span className="font-medium text-[#F0F4F8]">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B9DC3]">Shipping</span>
                  <span className="text-[#00E5A0] font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-white/[0.04] pt-2 mt-1">
                  <span className="text-[#F0F4F8]">Total</span>
                  <span className="text-[#F0F4F8] font-[family-name:var(--font-syne)]">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#060B18] rounded-2xl border border-white/[0.06] p-4">
              <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-3">Included</p>
              <ul className="space-y-2">
                {["Free expedited shipping", "5-year hardware warranty", "24/7 technical support", "Droplet Platform access"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#8B9DC3]">
                    <span className="w-1 h-1 rounded-full bg-[#00BFFF] shrink-0" />
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
