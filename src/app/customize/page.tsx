"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import { useDesign } from "@/context/DesignContext";
import { priceDesign, priceLines, formatMoney } from "@/lib/pricing";
import CustomizerPanel from "@/components/customizer/CustomizerPanel";
import ClothingPreview from "@/components/customizer/ClothingPreview";

function CustomizerContent() {
  const { design } = useDesign();

  const { unitPrice: totalEstimatedPrice } = priceDesign(design);

  return (
    <div className="relative min-h-screen bg-[#0F0B1E] text-[#F8F7FF] selection:bg-purple-600 selection:text-white">
      <MagicalParticles />
      <Navbar />

      {/* Background magical glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-700/15 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-purple-300/80 mb-2 font-mono">
              <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/upload" className="hover:text-amber-300 transition-colors">Outfit Scanner</Link>
              <span>/</span>
              <span className="text-amber-400">Atelier Customizer</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-200 to-amber-300 bg-clip-text text-transparent">
              ✨ Atelier AI Customizer
            </h1>
            <p className="text-sm md:text-base text-purple-200/80 mt-1 max-w-2xl">
              Every curve, thread, hem, and sleeve is simulated with supercomputer AI precision. Modify your garment duplicate below or design an entirely bespoke creation.
            </p>
          </div>

          {/* Live Pricing & Dropship Pill */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-3.5 flex items-center gap-4 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-purple-300/70 font-semibold">
                Dropship Direct
              </span>
              <span className="text-2xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {formatMoney(totalEstimatedPrice)}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <Link
              href="/checkout"
              className="rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold px-4 py-2.5 transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-105"
            >
              Order Now →
            </Link>
          </div>
        </div>

        {/* AI Supercomputer Status Indicator */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30 border border-purple-500/20 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-purple-200 font-medium">
              Quantum Weave Engine v4.8 Active &bull; Sub-millimeter pattern rendering
            </span>
          </div>
          <div className="flex items-center gap-4 text-purple-300/80">
            <span>Garment: <strong className="text-white">{design.basedOn ?? design.garmentType}</strong></span>
            <span>Est. Fabrication: <strong className="text-amber-300">48-72h</strong></span>
            <span>Worldwide Courier: <strong className="text-emerald-300">Ready</strong></span>
          </div>
        </div>

        {/* Split Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Customizer Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <CustomizerPanel />
          </div>

          {/* Right Column: Live Silhouette & Model Preview (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔮</span>
                  <h2 className="text-base font-bold text-white">Live Fabric Hologram</h2>
                </div>
                <Link
                  href="/preview"
                  className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 flex items-center gap-1 font-semibold"
                >
                  <span>3D Mannequin View</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Garment Preview SVG with real-time updates */}
              <ClothingPreview />
            </div>

            {/* Quick Spec Matrix */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 text-xs space-y-2">
              <h3 className="font-semibold text-purple-300 uppercase tracking-wider text-[10px]">
                Active Blueprint Specifications
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-purple-200/80">
                <div>Collar: <span className="text-white font-medium">{design.collar}</span></div>
                <div>Sleeves: <span className="text-white font-medium">{design.sleeve}</span></div>
                <div>Fit: <span className="text-white font-medium">{design.fit.type}</span></div>
                <div>Cut: <span className="text-white font-medium">{design.cut}</span></div>
                <div>Pocket Style: <span className="text-white font-medium">{design.pocket}</span></div>
                <div>Weave: <span className="text-white font-medium">{design.pattern.type}</span></div>
                <div>Details: <span className="text-amber-300 font-medium">{design.embellishments.length > 0 ? design.embellishments.join(", ") : "Minimalist"}</span></div>
                <div>Lettering: <span className="text-emerald-300 font-medium">{design.text.content || "None"}</span></div>
              </div>
            </div>

            {/* Itemized price (dropship direct) */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 text-xs space-y-2">
              <h3 className="font-semibold text-purple-300 uppercase tracking-wider text-[10px]">
                Price Breakdown (per piece)
              </h3>
              <ul className="space-y-1 text-purple-200/80">
                {priceLines(design).map((line) => (
                  <li key={line.label} className="flex justify-between">
                    <span>{line.label}</span>
                    <span className="text-white">{formatMoney(line.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-amber-300">
                <span>Total</span>
                <span>{formatMoney(totalEstimatedPrice)}</span>
              </div>
              <p className="text-[10px] text-purple-300/60">Shipping and tax are added at checkout.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CustomizePage() {
  return <CustomizerContent />;
}
