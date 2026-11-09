"use client";

import Link from "next/link";
import MagicalParticles from "@/components/MagicalParticles";
import Navbar from "@/components/Navbar";
import ModelViewer from "@/components/ModelViewer";
import { useDesign } from "@/context/DesignContext";
import { priceDesign, formatMoney } from "@/lib/pricing";

/* ==============================
   Feature cards data
   ============================== */
const FEATURES = [
  {
    icon: "🔍",
    title: "AI Outfit Recognition",
    description:
      "Our advanced AI instantly identifies fabrics, patterns, colors, stitching, and every detail of any garment from a single photo.",
  },
  {
    icon: "📐",
    title: "Perfect Measurements",
    description:
      "Smart sizing algorithms ensure your custom piece fits perfectly, with intelligent body-measurement mapping and size predictions.",
  },
  {
    icon: "🎨",
    title: "Full Customization",
    description:
      "Change colors, fabrics, patterns, add embroidery, adjust the cut — make every piece uniquely yours with real-time editing.",
  },
  {
    icon: "👗",
    title: "3D Model Preview",
    description:
      "See your custom design on a realistic 3D model before ordering. Rotate, zoom, and inspect every angle and detail.",
  },
  {
    icon: "🏷️",
    title: "Barcode & Tag Scanning",
    description:
      "Scan any clothing tag or barcode to instantly pull up product details, materials, and create a customizable duplicate.",
  },
  {
    icon: "🚚",
    title: "Direct to Your Door",
    description:
      "Premium manufacturing partners craft your design and ship it worldwide. Track every step from creation to delivery.",
  },
] as const;

/* ==============================
   How It Works steps
   ============================== */
const STEPS = [
  {
    step: 1,
    icon: "📸",
    title: "Upload",
    description: "Snap a photo of any outfit you love, scan a barcode, or start from a blank canvas.",
  },
  {
    step: 2,
    icon: "🤖",
    title: "AI Analyzes",
    description: "Our AI breaks down every element — fabric, cut, color, pattern, stitching, and more.",
  },
  {
    step: 3,
    icon: "✏️",
    title: "Customize",
    description: "Tweak anything you want. Mix colors, swap fabrics, adjust fit, add personal touches.",
  },
  {
    step: 4,
    icon: "📦",
    title: "Order",
    description: "Place your order and we'll craft your custom piece and deliver it to your doorstep.",
  },
] as const;

/* ==============================
   Footer links
   ============================== */
const FOOTER_LINKS = {
  Platform: [
    { label: "AI Outfit Scanner", href: "/upload" },
    { label: "Atelier Customizer", href: "/customize" },
    { label: "3D Mannequin View", href: "/preview" },
    { label: "Dropship Pricing", href: "/pricing" },
  ],
  Workflow: [
    { label: "Magical Features", href: "#features" },
    { label: "Live Model Demo", href: "#live-model" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Direct Checkout", href: "/checkout" },
  ],
  Specifications: [
    { label: "Barcode & Tag Scan", href: "/upload" },
    { label: "Custom Typography", href: "/customize" },
    { label: "Tailored Silhouettes", href: "/customize" },
  ],
} as const;

/* ==============================
   Floating clothing silhouettes
   ============================== */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dress silhouette */}
      <div
        className="absolute top-20 right-[10%] w-32 h-44 animate-float opacity-10"
        style={{ animationDelay: "0s" }}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-t-full bg-gradient-to-b from-purple-400 to-purple-600" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-purple-500 to-purple-700" />
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderTop: "60px solid rgba(124, 58, 237, 0.6)",
            }}
          />
        </div>
      </div>

      {/* T-shirt silhouette */}
      <div
        className="absolute top-40 left-[5%] w-28 h-28 animate-float opacity-10"
        style={{ animationDelay: "2s" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-3 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-500" />
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-amber-400 to-amber-500 rounded-t-lg" />
          <div className="absolute top-8 left-2 right-2 h-16 bg-gradient-to-b from-amber-500 to-amber-600 rounded-b-lg" />
        </div>
      </div>

      {/* Hanger shape */}
      <div
        className="absolute bottom-32 right-[15%] w-24 h-20 animate-float-slow opacity-10"
        style={{ animationDelay: "4s" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-pink-400 rounded-t-full" />
          <div className="absolute top-4 left-0 w-full h-3 border-2 border-pink-400 rounded-b-[50%] border-t-0" />
        </div>
      </div>

      {/* Abstract fabric swirl */}
      <div
        className="absolute bottom-20 left-[8%] w-36 h-36 animate-float opacity-[0.07]"
        style={{ animationDelay: "1s" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 45deg, rgba(124,58,237,0.5), rgba(245,158,11,0.5), rgba(232,168,124,0.5), rgba(124,58,237,0.5))",
            filter: "blur(8px)",
          }}
        />
      </div>
    </div>
  );
}

/* ==============================
   Main Page Component
   ============================== */
export default function HomePage() {
  const { design } = useDesign();
  const livePrice = priceDesign(design);

  return (
    <>
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10">
        {/* ======================== HERO SECTION ======================== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
          <FloatingShapes />

          {/* Radial gradient behind hero */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-float-slow">
              <span className="animate-sparkle inline-block">✨</span>
              <span className="text-sm font-medium text-[#C4B5FD]">
                AI-Powered Fashion Design Platform
              </span>
              <span className="animate-sparkle inline-block" style={{ animationDelay: "1s" }}>✨</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent animate-gradient-shift inline-block">
                Transform Any Outfit
              </span>
              <br />
              <span className="text-[#F8F7FF]">Into Your </span>
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                Perfect Design
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#C4B5FD] max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload a photo, scan a barcode, or design from scratch. Our AI
              identifies every detail and lets you customize everything.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {/* Primary CTA */}
              <Link
                href="/upload"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 active:scale-[0.98]"
              >
                {/* Sparkle glow behind button */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <span className="animate-sparkle" style={{ animationDelay: "0.5s" }}>✨</span>
                  Upload Your Outfit
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/customize"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-white/5 backdrop-blur-xl border border-white/20 text-[#F8F7FF] hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-[0.98]"
              >
                <span>🎨</span>
                Design From Scratch
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-[#C4B5FD]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                AI-Powered
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>Free to Try</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>No Credit Card</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-[#C4B5FD]/40">Scroll to explore</span>
            <svg
              className="w-5 h-5 text-[#C4B5FD]/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ======================== LIVE 3D MANNEQUIN SHOWCASE ======================== */}
        <section id="live-model" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-[0_8px_40px_rgba(124,58,237,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-amber-300">
                  <span>🔮</span>
                  <span>Interactive Hologram Mannequin</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-200 to-amber-300 bg-clip-text text-transparent leading-tight">
                  See Your Bespoke Outfit on a Live Model
                </h2>
                <p className="text-[#C4B5FD]/85 text-base leading-relaxed">
                  Our supercomputer AI reconstructs brand silhouettes, measurements, collars, sleeve geometry, weave patterns, pockets, and custom lettering—then renders your creation on an interactive model before sending it directly to our dropship partner.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="text-purple-300/70 block">Active Garment</span>
                    <span className="text-white font-bold text-sm">{design.garmentType} ({design.size})</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <span className="text-purple-300/70 block">Collar & Sleeves</span>
                    <span className="text-white font-bold text-sm">{design.collar} · {design.sleeve}</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 col-span-2 sm:col-span-1">
                    <span className="text-purple-300/70 block">Dropship Price</span>
                    <span className="text-amber-300 font-black text-base">{formatMoney(livePrice.unitPrice)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/customize"
                    className="rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-3.5 text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:scale-105"
                  >
                    ✨ Edit This Outfit in Atelier
                  </Link>
                  <Link
                    href="/upload"
                    className="rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-6 py-3.5 text-sm transition-all"
                  >
                    🏷️ Scan Barcode / Photo
                  </Link>
                  <Link
                    href="/checkout"
                    className="rounded-xl bg-amber-500/15 border border-amber-400/30 hover:bg-amber-500/25 text-amber-200 font-semibold px-5 py-3.5 text-sm transition-all"
                  >
                    Order Direct →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md rounded-2xl bg-[#0F0B1E]/60 border border-white/10 p-6 flex flex-col items-center">
                  <ModelViewer design={design} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== FEATURES SECTION ======================== */}
        <section id="features" className="relative py-24 px-4">
          {/* Section background accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent mb-4">
                Magical Features
              </h2>
              <p className="text-lg text-[#C4B5FD] max-w-2xl mx-auto">
                Powerful AI tools wrapped in an enchanting experience. Every feature
                designed to bring your fashion vision to life.
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:scale-[1.02] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow orb on hover */}
                  <div className="absolute -top-px -left-px -right-px -bottom-px rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#F8F7FF] mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#C4B5FD]/80 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Corner sparkle */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="animate-sparkle text-xs">✨</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================== HOW IT WORKS SECTION ======================== */}
        <section id="how-it-works" className="relative py-24 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent mb-4">
                How It Works
              </h2>
              <p className="text-lg text-[#C4B5FD] max-w-2xl mx-auto">
                Four simple steps to transform any outfit into your custom masterpiece.
              </p>
            </div>

            {/* Steps */}
            <div className="relative">
              {/* Connecting trail (desktop) */}
              <div
                className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-[2px]"
                aria-hidden="true"
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-30 animate-trail-pulse rounded-full" />
                {/* Animated sparkle dots along the trail */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-2 h-2 rounded-full bg-purple-400 animate-twinkle" style={{ animationDelay: "0s" }} />
                <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-2 h-2 rounded-full bg-pink-400 animate-twinkle" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 -translate-y-1/2 left-[80%] w-2 h-2 rounded-full bg-amber-400 animate-twinkle" style={{ animationDelay: "2s" }} />
              </div>

              {/* Step cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {STEPS.map((step, index) => (
                  <div key={step.title} className="relative flex flex-col items-center text-center group">
                    {/* Step number badge */}
                    <div className="relative mb-6">
                      {/* Glow ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 scale-110" />
                      {/* Circle */}
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/30 to-violet-600/30 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-purple-400/60 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]">
                        {step.icon}
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center text-xs font-bold text-white border-2 border-[#0F0B1E]">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-[#F8F7FF] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#C4B5FD]/80 text-sm leading-relaxed max-w-[250px]">
                      {step.description}
                    </p>

                    {/* Arrow connector (mobile/tablet) */}
                    {index < STEPS.length - 1 && (
                      <div className="lg:hidden flex items-center justify-center my-4 text-purple-500/40">
                        <svg
                          className="w-6 h-6 rotate-90"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA under steps */}
            <div className="text-center mt-16">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105"
              >
                <span>✨</span>
                Start Creating Now
              </Link>
            </div>
          </div>
        </section>

        {/* ======================== FOOTER ======================== */}
        <footer className="relative pt-16 pb-8 px-4">
          {/* Gradient border top */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto">
            {/* Footer grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Brand column */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                    ✨ ThreadCraft AI
                  </span>
                </Link>
                <p className="text-sm text-[#C4B5FD]/60 leading-relaxed max-w-[250px]">
                  AI-powered fashion design platform. Transform any outfit into
                  your perfect custom creation.
                </p>
              </div>

              {/* Link columns */}
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-[#F8F7FF] mb-4 uppercase tracking-wider">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#C4B5FD]/60 hover:text-[#C4B5FD] transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#C4B5FD]/40">
                © 2026 ThreadCraft AI. All rights reserved.
              </p>
              <p className="text-sm text-[#C4B5FD]/40 flex items-center gap-1.5">
                Powered by AI Magic{" "}
                <span className="animate-sparkle inline-block">✨</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
