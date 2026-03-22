"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";

const initialSensors = [
  { id: "SN-9021", location: "Zone A - Primary Inlet", status: "Online", flow: "4.2 L/s", temp: "22.1°C" },
  { id: "SN-9022", location: "Zone A - Secondary", status: "Online", flow: "3.8 L/s", temp: "23.4°C" },
  { id: "SN-9023", location: "Zone B - Return", status: "Warning", flow: "1.2 L/s", temp: "28.5°C" },
  { id: "SN-9024", location: "Zone C - Core AI Cluster", status: "Online", flow: "8.5 L/s", temp: "25.0°C" },
  { id: "SN-9025", location: "Zone C - GPU Rack Cooling", status: "Online", flow: "7.9 L/s", temp: "24.2°C" },
  { id: "SN-9026", location: "Zone D - Auxiliary Loop", status: "Online", flow: "2.1 L/s", temp: "21.8°C" },
  { id: "SN-9027", location: "Zone D - Chiller Output", status: "Online", flow: "2.4 L/s", temp: "22.0°C" },
  { id: "SN-9028", location: "Zone A - Makeup Water", status: "Online", flow: "0.8 L/s", temp: "18.3°C" },
  { id: "SN-9029", location: "Zone B - Supply Header", status: "Offline", flow: "0.0 L/s", temp: "—" },
  { id: "SN-9030", location: "Zone C - CDU Inlet", status: "Online", flow: "6.2 L/s", temp: "23.7°C" },
  { id: "SN-9031", location: "Zone C - CDU Return", status: "Online", flow: "6.0 L/s", temp: "26.1°C" },
  { id: "SN-9032", location: "Zone A - Cooling Tower Basin", status: "Online", flow: "3.5 L/s", temp: "20.4°C" },
  { id: "SN-9033", location: "Zone D - CRAH Unit 1", status: "Online", flow: "1.9 L/s", temp: "22.5°C" },
  { id: "SN-9034", location: "Zone B - Condenser Loop", status: "Warning", flow: "1.5 L/s", temp: "27.8°C" },
];

export default function SensorsPage() {
  const [sensors] = useState(initialSensors);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#F0F4F8] font-[family-name:var(--font-syne)]">Sensor Nodes</h1>
          <p className="text-[#8B9DC3]">Manage physical telemetry hardware deployments.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#00BFFF] text-[#060B18] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#00D4FF] transition-colors ">
          <Plus className="w-4 h-4" />
          Add Node
        </button>
      </div>

      <div className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06]  overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.04]">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5B78]" />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              className="w-full pl-9 pr-4 py-2 rounded-md border border-white/[0.06] text-sm focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#0D1424]/60">
                <th className="px-6 py-4 font-medium text-[#8B9DC3]">Node ID</th>
                <th className="px-6 py-4 font-medium text-[#8B9DC3]">Location</th>
                <th className="px-6 py-4 font-medium text-[#8B9DC3]">Status</th>
                <th className="px-6 py-4 font-medium text-[#8B9DC3]">Flow Rate</th>
                <th className="px-6 py-4 font-medium text-[#8B9DC3]">Temperature</th>
                <th className="px-6 py-4 font-medium text-[#8B9DC3]"></th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.04] transition-colors">
                  <td className="px-6 py-4 font-[family-name:var(--font-jetbrains)] text-[#F0F4F8]">{sensor.id}</td>
                  <td className="px-6 py-4 text-[#F0F4F8]">{sensor.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sensor.status === 'Online' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : sensor.status === 'Warning' ? 'bg-[#FFB020]/10 text-[#FFB020]' : 'bg-[#FF4757]/10 text-[#FF4757]'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#8B9DC3]">{sensor.flow}</td>
                  <td className="px-6 py-4 text-[#8B9DC3]">{sensor.temp}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#4A5B78] hover:text-[#00BFFF]">
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
