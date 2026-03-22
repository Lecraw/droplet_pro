"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";

const initialSensors = [
  { id: "SN-9021", location: "Zone A - Primary Inlet", status: "Online", flow: "4.2 L/s", temp: "22.1°C", pressure: "3.1 bar" },
  { id: "SN-9022", location: "Zone A - Secondary", status: "Online", flow: "3.8 L/s", temp: "23.4°C", pressure: "3.0 bar" },
  { id: "SN-9023", location: "Zone B - Return", status: "Warning", flow: "1.2 L/s", temp: "28.5°C", pressure: "2.4 bar" },
  { id: "SN-9024", location: "Zone C - Core AI Cluster", status: "Online", flow: "8.5 L/s", temp: "25.0°C", pressure: "3.8 bar" },
  { id: "SN-9025", location: "Zone C - GPU Rack East", status: "Online", flow: "7.1 L/s", temp: "26.2°C", pressure: "3.6 bar" },
  { id: "SN-9026", location: "Zone D - Chiller Intake", status: "Online", flow: "2.1 L/s", temp: "21.8°C", pressure: "3.3 bar" },
  { id: "SN-9027", location: "Zone D - Chiller Return", status: "Online", flow: "2.0 L/s", temp: "24.5°C", pressure: "3.2 bar" },
  { id: "SN-9028", location: "Zone A - Roof Condenser", status: "Online", flow: "5.6 L/s", temp: "19.8°C", pressure: "3.5 bar" },
  { id: "SN-9029", location: "Zone B - Distribution Header", status: "Warning", flow: "0.8 L/s", temp: "29.1°C", pressure: "2.1 bar" },
  { id: "SN-9030", location: "Zone E - Storage Tank Inlet", status: "Online", flow: "3.4 L/s", temp: "20.5°C", pressure: "2.9 bar" },
  { id: "SN-9031", location: "Zone E - Storage Tank Outlet", status: "Online", flow: "3.3 L/s", temp: "20.8°C", pressure: "2.8 bar" },
  { id: "SN-9032", location: "Zone C - GPU Rack West", status: "Online", flow: "6.9 L/s", temp: "25.8°C", pressure: "3.7 bar" },
  { id: "SN-9033", location: "Zone F - Makeup Water Line", status: "Online", flow: "1.5 L/s", temp: "18.2°C", pressure: "4.1 bar" },
  { id: "SN-9034", location: "Zone F - Blowdown Valve", status: "Offline", flow: "0.0 L/s", temp: "—", pressure: "0.0 bar" },
  { id: "SN-9035", location: "Zone A - Bypass Loop", status: "Online", flow: "2.8 L/s", temp: "22.9°C", pressure: "3.0 bar" },
  { id: "SN-9036", location: "Zone D - Heat Exchanger", status: "Online", flow: "4.4 L/s", temp: "27.3°C", pressure: "3.4 bar" },
];

export default function SensorsPage() {
  const [sensors] = useState(initialSensors);
  const [search, setSearch] = useState("");

  const filtered = sensors.filter(
    (s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.25em] text-[#0066FF] mb-1">Hardware</p>
          <h1 className="text-3xl font-bold text-[#0F172A] font-[family-name:var(--font-display)]">Sensor Nodes</h1>
          <p className="text-[#64748B]">Manage physical telemetry hardware deployments.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-mono)] text-xs text-[#64748B]">{sensors.length} nodes deployed</span>
          <button className="flex items-center gap-2 bg-[#0066FF] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0052CC] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Node
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Total Nodes</p>
          <p className="text-2xl font-bold text-[#0F172A]">{sensors.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Online</p>
          <p className="text-2xl font-bold text-emerald-600">{sensors.filter(s => s.status === "Online").length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Warnings</p>
          <p className="text-2xl font-bold text-amber-500">{sensors.filter(s => s.status === "Warning").length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8] mb-1">Offline</p>
          <p className="text-2xl font-bold text-red-500">{sensors.filter(s => s.status === "Offline").length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-[#E2E8F0] text-sm focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
            />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest text-[#94A3B8]">
            {filtered.length} of {sensors.length} nodes
          </span>
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
                <th className="px-6 py-4 font-medium text-[#64748B]">Pressure</th>
                <th className="px-6 py-4 font-medium text-[#64748B]"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sensor) => (
                <tr key={sensor.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-[family-name:var(--font-mono)] text-[#0F172A]">{sensor.id}</td>
                  <td className="px-6 py-4 text-[#0F172A]">{sensor.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sensor.status === 'Online' ? 'bg-emerald-100 text-emerald-800' :
                      sensor.status === 'Warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#64748B]">{sensor.flow}</td>
                  <td className="px-6 py-4 text-[#64748B]">{sensor.temp}</td>
                  <td className="px-6 py-4 text-[#64748B]">{sensor.pressure}</td>
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
