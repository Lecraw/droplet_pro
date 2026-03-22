"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product, useShopStore } from "@/store/useShopStore";
import { ShoppingCart, Check } from "lucide-react";
import Image from "next/image";

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
  {
    id: "sensor-node-pro",
    name: "Sensor Node Pro",
    description: "High-precision dual-channel sensor with built-in edge AI for anomaly detection and predictive alerts.",
    price: 749,
    category: "sensor",
    image: "/intelligent_sensor.png",
  },
  {
    id: "wireless-gateway",
    name: "Wireless Mesh Gateway",
    description: "Long-range LoRaWAN gateway connecting up to 200 sensor nodes. Weatherproof enclosure included.",
    price: 1250,
    category: "accessory",
    image: "/intelligent_sensor.png",
  },
];

export default function ShopPage() {
  const { addToCart } = useShopStore();

  return (
    <div className="pt-24 pb-32 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header — no box */}
        <div className="mb-16 border-b border-[#E2E8F0] pb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-[#0066FF]" />
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Sensors &amp; Accessories</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-[#0F172A]">Deploy Droplet.</h1>
            <p className="text-[#64748B] max-w-sm text-sm leading-relaxed">
              All hardware integrates seamlessly with the Droplet Intelligence Platform.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-[9px] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-[#94A3B8]">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-400" />Free shipping over $500</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#0066FF]" />Enterprise financing available</span>
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
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#0066FF]/20 hover:shadow-md transition-all duration-300 group flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-52 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.04),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={140}
          className="object-contain group-hover:scale-[1.04] transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] border border-[#E2E8F0] bg-white px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.2em] text-[#0066FF] mb-1">
          {product.category === "sensor" ? "Monitoring Hardware" : "Accessory"}
        </p>
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-2 leading-tight">{product.name}</h3>
        <p className="text-sm text-[#64748B] leading-relaxed mb-5 flex-1">{product.description}</p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-[#F0F4F8] mt-auto">
          <div>
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-0.5">
              Unit price
            </p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#0F172A]">
              ${product.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_16px_rgba(0,102,255,0.18)] hover:shadow-[0_0_24px_rgba(0,102,255,0.32)]"
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
