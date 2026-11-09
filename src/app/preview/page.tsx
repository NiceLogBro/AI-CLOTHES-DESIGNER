"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import ModelViewer from "@/components/ModelViewer";
import { useDesign, SIZES, type Size } from "@/context/DesignContext";
import { priceDesign, formatMoney } from "@/lib/pricing";

export default function PreviewPage() {
  const { design, setSize } = useDesign();
  const price = priceDesign(design);
  return (
    <main className="min-h-screen bg-[#0F0B1E] text-[#F8F7FF] overflow-hidden pt-20">
      <MagicalParticles />
      <Navbar />
      {/* Background aurora */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-pink-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent mb-3">
            ✨ Your Design Comes to Life
          </h1>
          <p className="text-[#C4B5FD]/80 text-lg max-w-xl mx-auto">
            Interact with your creation in full 3D. Rotate, zoom, and explore every detail.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Model Display Area */}
          <div className="flex-1 w-full">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 flex flex-col items-center relative overflow-hidden">
              {/* Subtle grid background */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <ModelViewer design={design} />
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-[380px] flex flex-col gap-6">
            {/* Design Summary Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-5">
                Design Summary
              </h2>

              <div className="space-y-4">
                <Row label="Garment">{design.garmentType}</Row>
                {design.basedOn && <Row label="Based on">{design.basedOn}</Row>}
                <Row label="Colors">
                  <div className="flex items-center gap-2">
                    {[design.colors.primary, design.colors.secondary, design.colors.accent].map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white/20 shadow-inner"
                        style={{ backgroundColor: c }}
                        title={["Primary", "Secondary", "Accent"][i]}
                      />
                    ))}
                  </div>
                </Row>
                <Row label="Pattern">{design.pattern.type}</Row>
                <Row label="Collar">{design.collar}</Row>
                <Row label="Sleeves">{design.sleeve}</Row>
                <Row label="Fit / Cut">
                  {design.fit.type} · {design.cut}
                </Row>
                <Row label="Pockets">
                  {design.pocket === "No Pockets" ? "None" : `${design.pocket} × ${design.pocketCount}`}
                </Row>
                <Row label="Details">{design.embellishments.length ? design.embellishments.join(", ") : "None"}</Row>
                <Row label="Lettering">{design.text.content.trim() || "None"}</Row>

                <div className="flex justify-between items-center">
                  <label htmlFor="size-select" className="text-[#C4B5FD]/70 text-sm">
                    Size
                  </label>
                  <select
                    id="size-select"
                    value={design.size}
                    onChange={(e) => setSize(e.target.value as Size)}
                    className="rounded-lg bg-white/10 border border-white/10 text-white px-3 py-1.5 text-sm"
                  >
                    {SIZES.map((s) => (
                      <option key={s} value={s} className="bg-[#1A1145]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[#C4B5FD]/70 text-sm">Price per piece</span>
                    <span className="text-2xl font-black text-amber-300">{formatMoney(price.unitPrice)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <span className="text-lg">⏱️</span>
                    <div>
                      <p className="text-sm font-semibold">Estimated Production</p>
                      <p className="text-xs text-amber-400/70">3-5 business days, plus shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Try Different Views Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🔮 Tips</h3>
              <ul className="space-y-2 text-sm text-[#C4B5FD]/70">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Use arrow buttons to rotate the model
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Adjust zoom slider to see details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Switch views to see all angles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  Colors may vary slightly in production
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            href="/customize"
            className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-[#C4B5FD] font-semibold px-6 py-3 transition-all duration-300 hover:bg-white/10 hover:border-purple-400/30 hover:text-white"
          >
            ← Back to Editor
          </Link>

          <p className="w-full text-center text-xs text-purple-300/60 order-last">
            Your design saves automatically in this browser.
          </p>

          <Link
            href="/checkout"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-8 py-3 transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] hover:scale-105 text-lg"
          >
            🛒 Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-[#C4B5FD]/70 text-sm">{label}</span>
      <span className="text-white font-medium text-right">{children}</span>
    </div>
  );
}