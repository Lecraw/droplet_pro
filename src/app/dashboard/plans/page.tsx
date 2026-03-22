"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Shield,
  Crown,
  Radio,
  BarChart3,
  Sparkles,
  Phone,
  Clock,
  Server,
  Users,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "forever",
    description: "For evaluation and small deployments",
    icon: Zap,
    color: "#4A5B78",
    features: [
      "Up to 5 sensor nodes",
      "Basic dashboard analytics",
      "24-hour data retention",
      "Email alerts",
      "Community support",
    ],
    cta: "Current Plan",
    disabled: true,
    current: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 1500,
    period: "/month",
    description: "Full-scale water intelligence for production data centers",
    icon: Shield,
    color: "#00BFFF",
    popular: true,
    features: [
      "Unlimited sensor nodes",
      "Real-time AI optimization",
      "12-month data retention",
      "Advanced analytics & reports",
      "Predictive maintenance alerts",
      "Ask Droplet AI (unlimited queries)",
      "Sustainability compliance reports",
      "Priority support (4hr SLA)",
      "Custom alert rules & escalations",
      "API access & webhook integrations",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
    current: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    period: "",
    description: "Custom deployment for hyperscale infrastructure",
    icon: Crown,
    color: "#FFB020",
    features: [
      "Everything in Professional",
      "Multi-site fleet management",
      "Unlimited data retention",
      "Dedicated account manager",
      "Custom AI model training",
      "On-premise deployment option",
      "SOC 2 & ISO 27001 compliance",
      "24/7 phone support (1hr SLA)",
    ],
    cta: "Contact Sales",
    disabled: false,
    current: false,
  },
];

const usageStats = [
  { label: "Active Sensors", value: "3 / 5", icon: Radio, percent: 60 },
  { label: "AI Queries", value: "47 / 50", icon: Sparkles, percent: 94 },
  { label: "Data Retention", value: "18 / 24 hrs", icon: Clock, percent: 75 },
  { label: "Team Members", value: "1 / 1", icon: Users, percent: 100 },
];

const faqs = [
  {
    q: "What happens when I upgrade?",
    a: "Your account is upgraded instantly. All sensor data history is preserved and extended to the new retention limit. No downtime required.",
  },
  {
    q: "Can I add more sensor nodes on Starter?",
    a: "The Starter plan supports up to 5 nodes. Upgrade to Professional for unlimited nodes with real-time AI optimization.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "Professional is billed monthly with no long-term commitment. Cancel anytime. Enterprise plans are custom-quoted annually.",
  },
  {
    q: "Do you offer volume discounts?",
    a: "Yes — Enterprise plans include volume pricing based on the number of sites and sensors. Contact our sales team for a custom quote.",
  },
];

export default function PlansPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const annualPrice = Math.round(1500 * 12 * 0.8 / 12); // 20% off

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-[#00BFFF]" />
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.3em] text-[#00BFFF]">
            Subscription
          </p>
        </div>
        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[#F0F4F8]">
          Plans & Billing
        </h1>
        <p className="text-sm text-[#8B9DC3] mt-1 max-w-lg">
          Scale your water intelligence platform as your infrastructure grows.
        </p>
      </div>

      {/* Current plan banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0D1424]/60 rounded-xl border border-white/[0.06] p-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#4A5B78]/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#4A5B78]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F0F4F8]">
              You&apos;re currently on the{" "}
              <span className="text-[#4A5B78] font-semibold">Starter</span> plan
            </p>
            <p className="text-xs text-[#4A5B78] font-[family-name:var(--font-jetbrains)] mt-0.5">
              Upgrade to unlock unlimited sensors, AI optimization, and advanced analytics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[9px] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider bg-[#4A5B78]/20 text-[#4A5B78] border border-[#4A5B78]/20">
            Free Tier
          </span>
        </div>
      </motion.div>

      {/* Usage stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {usageStats.map(({ label, value, icon: Icon, percent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0D1424]/60 rounded-xl border border-white/[0.06] p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className="w-4 h-4 text-[#4A5B78]" />
              <span
                className={`text-[9px] font-[family-name:var(--font-jetbrains)] font-semibold ${
                  percent >= 90 ? "text-[#FFB020]" : "text-[#8B9DC3]"
                }`}
              >
                {percent}%
              </span>
            </div>
            <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#F0F4F8] leading-none">
              {value}
            </p>
            <p className="text-[10px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider mt-1">
              {label}
            </p>
            {/* Usage bar */}
            <div className="mt-3 h-1 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  percent >= 90
                    ? "bg-[#FFB020]"
                    : "bg-[#00BFFF]"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setBilling("monthly")}
          className={`text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider transition-colors ${
            billing === "monthly" ? "text-[#F0F4F8]" : "text-[#4A5B78] hover:text-[#8B9DC3]"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            billing === "annual" ? "bg-[#00BFFF]" : "bg-[#4A5B78]/30"
          }`}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            animate={{ left: billing === "annual" ? 24 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`text-xs font-[family-name:var(--font-jetbrains)] uppercase tracking-wider transition-colors flex items-center gap-2 ${
            billing === "annual" ? "text-[#F0F4F8]" : "text-[#4A5B78] hover:text-[#8B9DC3]"
          }`}
        >
          Annual
          <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#00E5A0]/10 text-[#00E5A0] font-semibold">
            SAVE 20%
          </span>
        </button>
      </div>

      {/* Plan cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {plans.map((plan, i) => {
          const displayPrice =
            plan.price === null
              ? null
              : plan.price === 0
              ? 0
              : billing === "annual"
              ? annualPrice
              : plan.price;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`relative bg-[#0D1424]/60 rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? "border-[#00BFFF]/30 shadow-[0_0_40px_rgba(0,191,255,0.08)]"
                  : "border-white/[0.06]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[9px] font-[family-name:var(--font-jetbrains)] uppercase tracking-wider bg-[#00BFFF] text-[#060B18] font-semibold">
                    Recommended
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${plan.color}15` }}
                >
                  <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#F0F4F8]">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#8B9DC3] leading-relaxed mb-5">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                {displayPrice === null ? (
                  <div>
                    <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold text-[#F0F4F8]">
                      Custom
                    </p>
                    <p className="text-[10px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)] mt-1">
                      Tailored to your infrastructure
                    </p>
                  </div>
                ) : displayPrice === 0 ? (
                  <div>
                    <p className="font-[family-name:var(--font-syne)] text-3xl font-extrabold text-[#F0F4F8]">
                      $0
                    </p>
                    <p className="text-[10px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)] mt-1">
                      Free forever
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <motion.p
                        key={displayPrice}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-[family-name:var(--font-syne)] text-3xl font-extrabold text-[#F0F4F8]"
                      >
                        ${displayPrice.toLocaleString()}
                      </motion.p>
                      <span className="text-sm text-[#4A5B78]">/mo</span>
                    </div>
                    {billing === "annual" && plan.price !== null && plan.price > 0 && (
                      <p className="text-[10px] text-[#00E5A0] font-[family-name:var(--font-jetbrains)] mt-1">
                        ${(annualPrice * 12).toLocaleString()}/year — save ${((plan.price * 12) - (annualPrice * 12)).toLocaleString()}
                      </p>
                    )}
                    {billing === "monthly" && (
                      <p className="text-[10px] text-[#4A5B78] font-[family-name:var(--font-jetbrains)] mt-1">
                        Billed monthly, cancel anytime
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      style={{ color: plan.color }}
                    />
                    <span className="text-xs text-[#8B9DC3] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] shadow-[0_0_20px_rgba(0,191,255,0.2)]"
                    : plan.id === "enterprise"
                    ? "bg-[#FFB020]/10 hover:bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/20"
                    : "bg-white/[0.04] text-[#4A5B78] border border-white/[0.06] cursor-default"
                }`}
              >
                {plan.cta}
                {!plan.disabled && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Feature comparison */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0D1424]/60 rounded-2xl border border-white/[0.06] overflow-hidden"
      >
        <div className="p-6 border-b border-white/[0.06]">
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-1">
            Detailed Comparison
          </p>
          <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[#F0F4F8]">
            What&apos;s included in each plan
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-6 text-[#4A5B78] font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider font-medium w-1/3">
                  Feature
                </th>
                <th className="text-center py-3 px-4 text-[#4A5B78] font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider font-medium">
                  Starter
                </th>
                <th className="text-center py-3 px-4 text-[#00BFFF] font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider font-medium">
                  Professional
                </th>
                <th className="text-center py-3 px-4 text-[#FFB020] font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider font-medium">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Sensor Nodes", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
                { feature: "Data Retention", starter: "24 hrs", pro: "12 months", enterprise: "Unlimited" },
                { feature: "AI Optimization", starter: false, pro: true, enterprise: true },
                { feature: "Ask Droplet AI", starter: "50/mo", pro: "Unlimited", enterprise: "Unlimited" },
                { feature: "Sustainability Reports", starter: false, pro: true, enterprise: true },
                { feature: "Custom Alert Rules", starter: false, pro: true, enterprise: true },
                { feature: "API Access", starter: false, pro: true, enterprise: true },
                { feature: "Multi-Site Management", starter: false, pro: false, enterprise: true },
                { feature: "Custom AI Training", starter: false, pro: false, enterprise: true },
                { feature: "On-Premise Deploy", starter: false, pro: false, enterprise: true },
                { feature: "Support SLA", starter: "Community", pro: "4hr", enterprise: "1hr" },
                { feature: "Dedicated Account Mgr", starter: false, pro: false, enterprise: true },
              ].map(({ feature, starter, pro, enterprise }, i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-white/[0.01]" : ""}>
                  <td className="py-2.5 px-6 text-[#8B9DC3] font-medium">{feature}</td>
                  <td className="py-2.5 px-4 text-center">
                    {typeof starter === "boolean" ? (
                      starter ? (
                        <Check className="w-3.5 h-3.5 text-[#4A5B78] mx-auto" />
                      ) : (
                        <span className="text-[#4A5B78]/40">—</span>
                      )
                    ) : (
                      <span className="text-[#8B9DC3]">{starter}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {typeof pro === "boolean" ? (
                      pro ? (
                        <Check className="w-3.5 h-3.5 text-[#00BFFF] mx-auto" />
                      ) : (
                        <span className="text-[#4A5B78]/40">—</span>
                      )
                    ) : (
                      <span className="text-[#00BFFF]">{pro}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {typeof enterprise === "boolean" ? (
                      enterprise ? (
                        <Check className="w-3.5 h-3.5 text-[#FFB020] mx-auto" />
                      ) : (
                        <span className="text-[#4A5B78]/40">—</span>
                      )
                    ) : (
                      <span className="text-[#FFB020]">{enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em] text-[#4A5B78] mb-4">
          Frequently Asked Questions
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              className="bg-[#0D1424]/60 rounded-xl border border-white/[0.06] p-5"
            >
              <p className="text-sm font-medium text-[#F0F4F8] mb-2">{q}</p>
              <p className="text-xs text-[#8B9DC3] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-[#00BFFF]/10 via-[#0D1424]/60 to-[#00BFFF]/10 rounded-2xl border border-[#00BFFF]/15 p-8 text-center"
      >
        <Server className="w-8 h-8 text-[#00BFFF] mx-auto mb-3" />
        <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[#F0F4F8] mb-2">
          Need a custom deployment?
        </h3>
        <p className="text-sm text-[#8B9DC3] max-w-md mx-auto mb-5">
          Our team will design a water intelligence solution tailored to your data center infrastructure.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#00BFFF] hover:bg-[#00D4FF] text-[#060B18] transition-all shadow-[0_0_20px_rgba(0,191,255,0.2)]">
            <Phone className="w-4 h-4" />
            Talk to Sales
          </button>
          <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-[#8B9DC3] hover:text-[#F0F4F8] border border-white/[0.06] hover:border-[#00BFFF]/20 transition-all">
            View Documentation
          </button>
        </div>
      </motion.div>
    </div>
  );
}
