"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, RefreshCw, AlertTriangle } from "lucide-react";

export default function CoolingManagementPage() {
  const [capacity, setCapacity] = useState(85);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Cooling Intelligence</h1>
        <p className="text-[#64748B]">Manage active cooling loop capacity and AI automation limits.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-[#0F172A]">Primary Micro Cooling Loop</h2>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                <RefreshCw className="w-3 h-3 animate-spin-slow" /> AI AUTO
              </span>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">System Capacity Limit</p>
                    <p className="text-xs text-[#64748B]">Regulate maximum power draw for the cooling loop.</p>
                  </div>
                  <span className="text-2xl font-bold text-[#0066FF] font-[family-name:var(--font-display)]">{capacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={capacity} 
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                />
              </div>

              <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl text-center">
                  <p className="text-xs text-[#64748B] mb-1">Target PUE</p>
                  <p className="text-xl font-bold text-[#0F172A]">1.12</p>
                </div>
                <div className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl text-center">
                  <p className="text-xs text-[#64748B] mb-1">Current Load</p>
                  <p className="text-xl font-bold text-[#0F172A]">2.4 MW</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
            <div className="flex gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Optimization Suggestion</h3>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Droplet AI has detected thermal headroom in Zone B. Reducing flow rate by 0.5 L/s could save 4,200 gallons per week without exceeding safe operating temperatures.
                </p>
                <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors w-full">
                  Apply Optimization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
