"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    desc: "For small deployments and proof-of-concept pilots.",
    price: "Free",
    period: "",
    highlight: false,
    features: [
      "Up to 4 sensor nodes",
      "Real-time dashboard",
      "24-hour data retention",
      "Email alerts",
      "Community support",
    ],
    cta: "Get Started",
    ctaHref: "/request-demo",
  },
  {
    name: "Pro",
    desc: "For growing teams managing multi-zone infrastructure.",
    price: "$499",
    period: "/mo",
    highlight: true,
    features: [
      "Up to 50 sensor nodes",
      "Real-time dashboard + analytics",
      "90-day data retention",
      "Droplet AI assistant",
      "Custom alert rules",
      "API access + webhooks",
      "Grafana & Datadog export",
      "Priority email support",
    ],
    cta: "Request Access",
    ctaHref: "/request-demo",
  },
  {
    name: "Enterprise",
    desc: "For hyperscale operators and campus-scale deployments.",
    price: "Custom",
    period: "",
    highlight: false,
    features: [
      "Unlimited sensor nodes",
      "Full platform access",
      "Unlimited data retention",
      "Droplet AI with custom models",
      "Dedicated account manager",
      "SLA with 99.99% uptime",
      "SSO / SAML integration",
      "On-premise deployment option",
      "Custom integrations",
      "24/7 phone + Slack support",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
  },
];

const faqs = [
  {
    q: "Do I need to buy hardware separately?",
    a: "Yes — Droplet sensor nodes and accessories are purchased separately through our Shop. The platform subscription covers the software, dashboard, AI features, and data storage.",
  },
  {
    q: "What happens if I exceed my node limit?",
    a: "You'll receive a notification when you're approaching your limit. Additional nodes can be added by upgrading your plan or contacting sales for a custom arrangement.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Pro plans are billed monthly and can be cancelled at any time. Enterprise agreements are typically annual but terms are flexible.",
  },
  {
    q: "Can I try Droplet AI before committing?",
    a: "Yes — the Starter plan includes a 14-day trial of Droplet AI features so you can evaluate the value before upgrading to Pro.",
  },
  {
    q: "Do you offer volume discounts on hardware?",
    a: "Yes. Orders of 20+ sensor nodes qualify for volume pricing. Contact our sales team for a custom quote.",
  },
  {
    q: "What data security certifications do you have?",
    a: "Droplet is SOC 2 Type II certified and ISO 27001 compliant. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Enterprise plans support on-premise deployment for maximum data sovereignty.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="max-w-5xl mx-auto relative">
            <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.25em] text-[#94A3B8] hover:text-[#0066FF] mb-12 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#0066FF]" />
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Pricing</p>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight mb-4">
                Simple, transparent pricing.
              </h1>
              <p className="text-lg text-[#64748B] max-w-xl">
                Start free with up to 4 nodes. Scale to enterprise with unlimited sensors, AI insights, and dedicated support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className={`rounded-2xl p-8 flex flex-col ${
                    plan.highlight
                      ? "bg-[#0F172A] text-white border-2 border-[#0066FF] relative"
                      : "bg-white border border-[#E2E8F0]"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-[9px] font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <p className={`font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-widest mb-2 ${plan.highlight ? "text-[#0066FF]" : "text-[#0066FF]"}`}>{plan.name}</p>
                  <p className={`text-sm mb-6 ${plan.highlight ? "text-[#94A3B8]" : "text-[#64748B]"}`}>{plan.desc}</p>
                  <div className="mb-8">
                    <span className={`font-[family-name:var(--font-space-grotesk)] text-4xl font-bold ${plan.highlight ? "text-white" : "text-[#0F172A]"}`}>{plan.price}</span>
                    {plan.period && <span className={`text-sm ${plan.highlight ? "text-[#94A3B8]" : "text-[#94A3B8]"}`}>{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? "text-[#0066FF]" : "text-emerald-500"}`} />
                        <span className={plan.highlight ? "text-[#CBD5E1]" : "text-[#64748B]"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.ctaHref}
                    className={`text-center text-sm font-medium py-3 rounded-lg transition-all ${
                      plan.highlight
                        ? "bg-[#0066FF] text-white hover:bg-[#0052CC]"
                        : "border border-[#E2E8F0] text-[#0F172A] hover:border-[#0066FF] hover:text-[#0066FF]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">FAQ</p>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0F172A] mb-10">Frequently asked questions.</h2>
            <div className="border-t border-[#E2E8F0]">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="border-b border-[#E2E8F0] py-6">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[#0F172A] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#0F172A] mb-4">Ready to get started?</h2>
            <p className="text-[#64748B] mb-8">Deploy your first sensor nodes and start monitoring in minutes.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/request-demo" className="bg-[#0066FF] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0052CC] transition-colors">
                Request Access
              </Link>
              <Link href="/contact" className="border border-[#E2E8F0] text-[#64748B] text-sm font-medium px-6 py-3 rounded-lg hover:border-[#0066FF]/30 hover:text-[#0066FF] transition-all">
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
