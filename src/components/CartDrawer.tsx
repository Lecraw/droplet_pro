"use client";

import { useShopStore } from "@/store/useShopStore";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight, Package, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart } = useShopStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[440px] bg-[#0A0F1E] shadow-2xl z-50 flex flex-col border-l border-white/[0.06]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0D1424]/40 border border-white/[0.06] rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-[#F0F4F8]" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#F0F4F8]">Cart</h2>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-widest text-[#4A5B78]">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button onClick={toggleCart} className="p-2 hover:bg-[#0D1424]/40 rounded-lg transition-colors">
                <X className="w-5 h-5 text-[#8B9DC3]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 bg-[#0D1424]/40 border border-white/[0.06] rounded-2xl flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7 text-[#4A5B78]" />
                  </div>
                  <p className="font-medium text-[#F0F4F8] mb-1">Your cart is empty</p>
                  <p className="text-sm text-[#4A5B78] mb-6">Add hardware to get started</p>
                  <button
                    onClick={toggleCart}
                    className="text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider text-[#00BFFF] border border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 px-4 py-2 rounded-lg transition-colors"
                  >
                    Browse Hardware
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-[#0D1424]/40 border border-white/[0.06] rounded-xl p-4"
                  >
                    <div className="w-18 h-18 min-w-[72px] bg-[#0D1424]/60 rounded-lg border border-white/[0.06] overflow-hidden flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="object-contain w-full h-full" style={{ width: 64, height: 64 }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-[#F0F4F8] text-sm leading-tight">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 text-[#4A5B78] hover:text-[#FF4757] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                        <p key={key} className="text-[10px] font-[family-name:var(--font-jetbrains)] text-[#4A5B78] mt-0.5 uppercase tracking-wider">
                          {key}: {value}
                        </p>
                      ))}

                      <div className="flex items-center justify-between mt-3">
                        <p className="font-[family-name:var(--font-syne)] font-bold text-[#00BFFF]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-0 bg-[#0D1424]/60 border border-white/[0.06] rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/[0.04] text-[#8B9DC3] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-[#F0F4F8]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/[0.04] text-[#8B9DC3] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-white/[0.06]">
                {/* Trust signals */}
                <div className="px-5 pt-4 flex items-center justify-between">
                  {[
                    { icon: <Truck className="w-3 h-3" />, label: "Free shipping" },
                    { icon: <Shield className="w-3 h-3" />, label: "5-yr warranty" },
                    { icon: <Package className="w-3 h-3" />, label: "Fast fulfillment" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[#8B9DC3]">
                      {icon}
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 space-y-4">
                  {/* Line items */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8B9DC3]">Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-[#F0F4F8]">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8B9DC3]">Shipping</span>
                      <span className="font-medium text-[#00E5A0]">Free</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/[0.04] pt-2 mt-2">
                      <span className="font-bold text-[#F0F4F8]">Total</span>
                      <span className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#F0F4F8]">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="flex items-center justify-center gap-2 w-full bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] font-bold py-4 rounded-xl shadow-[0_0_24px_rgba(0,191,255,0.2)] hover:shadow-[0_0_32px_rgba(0,191,255,0.35)] transition-all active:scale-[0.98]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => { clearCart(); }}
                    className="w-full text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider text-[#4A5B78] hover:text-[#FF4757] transition-colors py-2"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
