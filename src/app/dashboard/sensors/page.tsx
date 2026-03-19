"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";

const initialSensors = [
  { id: "SN-9021", location: "Zone A - Primary Inlet", status: "Online", flow: "4.2 L/s", temp: "22.1°C" },
  { id: "SN-9022", location: "Zone A - Secondary", status: "Online", flow: "3.8 L/s", temp: "23.4°C" },
  { id: "SN-9023", location: "Zone B - Return", status: "Warning", flow: "1.2 L/s", temp: "28.5°C" },
  { id: "SN-9024", location: "Zone C - Core AI Cluster", status: "Online", flow: "8.5 L/s", temp: "25.0°C" },
];

export default function SensorsPage() {
  const [sensors] = useState(initialSensors);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Sensor Nodes</h1>
          <p className="text-[#64748B]">Manage physical telemetry hardware deployments.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0066FF] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0052CC] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Node
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              className="w-full pl-9 pr-4 py-2 rounded-md border border-[#E2E8F0] text-sm focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-white">
                <th className="px-6 py-4 font-medium text-[#64748B]">Node ID</th>
                <th className="px-6 py-4 font-medium text-[#64748B]">Location</th>
                <th className="px-6 py-4 font-medium text-[#64748B]">Status</th>
                <th className="px-6 py-4 font-medium text-[#64748B]">Flow Rate</th>
                <th className="px-6 py-4 font-medium text-[#64748B]">Temperature</th>
                <th className="px-6 py-4 font-medium text-[#64748B]"></th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-[#0F172A]">{sensor.id}</td>
                  <td className="px-6 py-4 text-[#0F172A]">{sensor.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#64748B]">{sensor.flow}</td>
                  <td className="px-6 py-4 text-[#64748B]">{sensor.temp}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#94A3B8] hover:text-[#0F172A]">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
