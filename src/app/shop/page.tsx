"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product, useShopStore } from "@/store/useShopStore";
import { ShoppingCart, Check } from "lucide-react";
import Image from "next/image";

// Per-option price lookup
const optionPrices: Record<string, Record<string, number>> = {};

function computePrice(id: string, selected: Record<string, string>, base: number): number {
  const p = optionPrices[id];
  if (!p) return base;
  return base;
}

export const products: Product[] = [
  {
    id: "sensor-node-v2",
    name: "Intelligent Sensor Node v2",
    description: "Industrial-grade telemetry node for flow, pressure, and temperature. Requires Pipeline Kit.",
    price: 349,
    category: "sensor",
    image: "/intelligent_sensor.png",
  },
  {
    id: "pipe-kit",
    name: "Pipeline Integration Kit",
    description: "Universal mounting hardware for 2-inch to 48-inch industrial water mains.",
    price: 89,
    category: "accessory",
    image: "/intelligent_sensor.png",
  },
];

export default function ShopPage() {
  const { addToCart } = useShopStore();

  return (
    <div className="pt-24 pb-32 bg-[#060B18] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header — no box */}
        <div className="mb-16 border-b border-white/[0.06] pb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-[#00BFFF]" />
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#00BFFF]">Sensors &amp; Accessories</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-[#F0F4F8]">Deploy Droplet.</h1>
            <p className="text-[#8B9DC3] max-w-sm text-sm leading-relaxed">
              All hardware integrates seamlessly with the Droplet Intelligence Platform.
              Pricing adjusts based on configuration.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-[9px] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-[#4A5B78]">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#00E5A0]" />Free shipping over $500</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#00BFFF]" />Enterprise financing available</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#94A3B8]" />5-year warranty included</span>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product, index, onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (p: Product, qty: number, opts?: Record<string, string>) => void;
}) {
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.options?.forEach(o => { init[o.label] = o.values[0]; });
    return init;
  });
  const [added, setAdded] = useState(false);

  const price = computePrice(product.id, selected, product.price);
  const hasOptions = !!product.options?.length;

  const handleAdd = () => {
    onAdd({ ...product, price }, 1, hasOptions ? selected : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-[#0D1424]/60 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#00BFFF]/20 transition-all duration-300 group flex flex-col"
    >
      {/* Image area — light background, no dark overlay */}
      <div className="relative h-52 bg-[#060B18] border-b border-white/[0.06] flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,255,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={140}
          className="object-contain group-hover:scale-[1.04] transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#4A5B78] border border-white/[0.06] bg-[#0D1424]/60 px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#00BFFF] mb-1">
          {product.category === "sensor" ? "Monitoring Hardware" : "Accessory"}
        </p>
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#F0F4F8] mb-2 leading-tight">{product.name}</h3>
        <p className="text-sm text-[#8B9DC3] leading-relaxed mb-5 flex-1">{product.description}</p>

        {/* Options — each as a segmented selector */}
        {product.options?.map((opt) => (
          <div key={opt.label} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78]">{opt.label}</label>
              {/* Show price impact for non-first options */}
              {opt.label === "Redundancy" && (
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#8B9DC3]">
                  {selected["Redundancy"] === "Standard (1N)" ? "Included" :
                   selected["Redundancy"] === "High (2N)" ? "+$15,000" : "+$28,000"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {opt.values.map(val => (
                <button
                  key={val}
                  onClick={() => setSelected(prev => ({ ...prev, [opt.label]: val }))}
                  className={`text-xs px-3 py-1.5 rounded-md border font-[family-name:var(--font-ibm-plex-mono)] transition-all ${
                    selected[opt.label] === val
                      ? "border-[#00BFFF] bg-[#00BFFF]/5 text-[#00BFFF]"
                      : "border-white/[0.06] text-[#8B9DC3] hover:border-[#4A5B78]"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-white/[0.04] mt-auto">
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#4A5B78] mb-0.5">
              {hasOptions ? "Configured price" : "Unit price"}
            </p>
            <motion.p
              key={price}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#F0F4F8]"
            >
              ${price.toLocaleString()}
            </motion.p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              added
                ? "bg-[#00E5A0] text-[#060B18]"
                : "bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] shadow-[0_0_16px_rgba(0,191,255,0.18)] hover:shadow-[0_0_24px_rgba(0,191,255,0.32)]"
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
