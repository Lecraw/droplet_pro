"use client";

import Navbar from "@/components/Navbar";
import ProblemSection from "@/components/ProblemSection";
import Footer from "@/components/Footer";

export default function ProblemPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ProblemSection />
      </main>
      <Footer />
    </>
  );
}
