import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-6 lg:px-8 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.25em] text-[#94A3B8] hover:text-[#0066FF] mb-12 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#0066FF]" />
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.3em] text-[#0066FF]">Legal</p>
            </div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-[#0F172A] mb-4">Privacy Policy</h1>
            <p className="text-[#94A3B8] font-[family-name:var(--font-ibm-plex-mono)] text-xs">Last updated: March 1, 2026</p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose-sm text-[#64748B] leading-relaxed space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">1. Introduction</h2>
              <p>Droplet Technologies, Inc. (&quot;Droplet,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our website, products, sensor hardware, and the Droplet Intelligence Platform (collectively, the &quot;Services&quot;).</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">2. Information We Collect</h2>
              <p className="mb-3"><strong className="text-[#0F172A]">Account Information:</strong> When you create an account, we collect your name, email address, company name, and job title.</p>
              <p className="mb-3"><strong className="text-[#0F172A]">Sensor Telemetry Data:</strong> Our sensor nodes collect water flow rate, temperature, and pressure readings from your infrastructure. This data is transmitted to the Droplet platform for processing and analysis. Telemetry data belongs to you — we process it on your behalf to provide our Services.</p>
              <p className="mb-3"><strong className="text-[#0F172A]">Usage Data:</strong> We collect information about how you interact with our dashboard and platform, including pages viewed, features used, and session duration.</p>
              <p><strong className="text-[#0F172A]">Payment Information:</strong> Payment processing is handled by our third-party payment processor (Stripe). We do not store credit card numbers on our servers.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, operate, and maintain the Droplet platform and Services</li>
                <li>Process and display sensor telemetry data in your dashboard</li>
                <li>Generate AI-driven insights and optimization recommendations</li>
                <li>Send system alerts, maintenance notifications, and service updates</li>
                <li>Process transactions and send billing-related communications</li>
                <li>Improve and develop new features based on aggregated usage patterns</li>
                <li>Respond to support requests and communicate with you</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">4. Data Sharing and Disclosure</h2>
              <p className="mb-3">We do not sell your personal information or sensor data. We may share information in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#0F172A]">Service Providers:</strong> We share data with trusted third parties who assist in operating our platform (cloud hosting, analytics, payment processing)</li>
                <li><strong className="text-[#0F172A]">Legal Requirements:</strong> We may disclose data if required by law, regulation, or valid legal process</li>
                <li><strong className="text-[#0F172A]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong className="text-[#0F172A]">Aggregated Data:</strong> We may share anonymized, aggregated statistics (e.g., industry benchmarks) that cannot identify individual customers</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">5. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data, including encryption in transit (TLS 1.3), encryption at rest (AES-256), SOC 2 Type II compliance, and regular security audits. Our infrastructure is hosted on SOC 2 and ISO 27001 certified cloud providers.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">6. Data Retention</h2>
              <p>Telemetry data is retained according to your subscription plan (24 hours for Starter, 90 days for Pro, unlimited for Enterprise). Account information is retained for the duration of your account and for a reasonable period afterward for legal and business purposes. You may request deletion of your data at any time.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">7. Your Rights</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Export your sensor data in standard formats</li>
                <li>Opt out of marketing communications</li>
                <li>Restrict or object to certain data processing</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">8. Cookies</h2>
              <p>We use essential cookies to operate the platform (authentication, session management) and optional analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">9. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:</p>
              <p className="mt-2">Droplet Technologies, Inc.<br />San Jose, CA<br />privacy@droplet.tech</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
