import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-[#0F172A] mb-4">Terms of Service</h1>
            <p className="text-[#94A3B8] font-[family-name:var(--font-ibm-plex-mono)] text-xs">Last updated: March 1, 2026</p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose-sm text-[#64748B] leading-relaxed space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the services provided by Droplet Technologies, Inc. (&quot;Droplet,&quot; &quot;we,&quot; &quot;us&quot;), including our website, sensor hardware, and the Droplet Intelligence Platform (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">2. Description of Services</h2>
              <p>Droplet provides water intelligence solutions for data center infrastructure, including: (a) sensor hardware for monitoring flow rate, temperature, and pressure; (b) a cloud-based platform for real-time telemetry visualization and analytics; (c) AI-driven insights and optimization recommendations; and (d) related support and professional services.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">3. Account Registration</h2>
              <p>To use certain features of the Services, you must create an account. You agree to provide accurate, current, and complete information and to keep your account credentials secure. You are responsible for all activity that occurs under your account. Notify us immediately at security@droplet.tech if you suspect unauthorized access.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">4. Subscription Plans and Payment</h2>
              <p className="mb-3">Access to the Droplet platform is provided through subscription plans (Starter, Pro, Enterprise). By subscribing to a paid plan, you agree to pay all applicable fees as described on our Pricing page.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pro subscriptions are billed monthly and renew automatically unless cancelled</li>
                <li>Enterprise agreements are governed by separate order forms</li>
                <li>Fees are non-refundable except as required by applicable law</li>
                <li>We reserve the right to modify pricing with 30 days&apos; notice</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">5. Hardware Purchases</h2>
              <p>Sensor nodes and accessories purchased through the Droplet Shop are sold subject to our standard hardware warranty (5 years from date of shipment). Hardware is shipped FOB origin. Title and risk of loss pass to you upon delivery to the carrier. Returns are accepted within 30 days of receipt for unused, undamaged products.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">6. Data Ownership</h2>
              <p>You retain all rights to the telemetry data collected by your sensor nodes (&quot;Customer Data&quot;). You grant Droplet a limited license to process, store, and analyze Customer Data solely for the purpose of providing the Services. We may use anonymized, aggregated data for improving our products and generating industry benchmarks, provided such data cannot identify you or your infrastructure.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">7. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Services for any unlawful purpose or in violation of any applicable regulations</li>
                <li>Reverse engineer, decompile, or disassemble any part of the platform software</li>
                <li>Attempt to gain unauthorized access to other users&apos; accounts or data</li>
                <li>Interfere with or disrupt the integrity or performance of the Services</li>
                <li>Resell, sublicense, or redistribute access to the Services without written consent</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">8. Intellectual Property</h2>
              <p>The Droplet platform, software, firmware, documentation, trademarks, and all related intellectual property are owned by Droplet Technologies, Inc. Nothing in these Terms grants you any rights to our intellectual property except the limited license to use the Services as described herein.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">9. Limitation of Liability</h2>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, DROPLET SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF THE SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">10. Disclaimer of Warranties</h2>
              <p>THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. DROPLET DOES NOT GUARANTEE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. SENSOR READINGS ARE PROVIDED FOR INFORMATIONAL PURPOSES AND SHOULD NOT BE THE SOLE BASIS FOR CRITICAL INFRASTRUCTURE DECISIONS.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">11. Termination</h2>
              <p>Either party may terminate these Terms at any time. Upon termination, your access to the Services will cease and we will delete your Customer Data within 30 days, unless you request an export. Sections regarding intellectual property, limitation of liability, and governing law survive termination.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">12. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Santa Clara County, California.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">13. Changes to These Terms</h2>
              <p>We may update these Terms from time to time. If we make material changes, we will notify you via email or through the platform at least 30 days before the changes take effect. Continued use of the Services after the effective date constitutes acceptance of the revised Terms.</p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#0F172A] mb-3">14. Contact</h2>
              <p>For questions about these Terms, contact us at:</p>
              <p className="mt-2">Droplet Technologies, Inc.<br />San Jose, CA<br />legal@droplet.tech</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
