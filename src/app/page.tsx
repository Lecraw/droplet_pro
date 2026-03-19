"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TickerBar from "@/components/TickerBar";
import ScrollNarrative from "@/components/ScrollNarrative";
import ProductSection from "@/components/ProductSection";
import DataVisualization from "@/components/DataVisualization";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TickerBar />
        <ScrollNarrative />
        <ProductSection />
        <DataVisualization />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
