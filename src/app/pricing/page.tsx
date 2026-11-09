"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";

const PRICING_TIERS = [
  {
    name: "Aura Solo",
    subtitle: "For Individual Style Creators",
    price: "$39",
    unit: "per custom garment",
    badge: "Most Popular",
    description: "Scan your favorite outfit, tweak every detail, and receive a tailor-made duplicate delivered to your door.",
    features: [
      "Full AI Outfit Recognition & Tag Extraction",
      "Interactive 3D Hologram Preview",
      "Unlimited Color & Pattern Adjustments",
      "Custom Monograms & Typography",
      "Direct-to-Door Dropship Worldwide",
      "3-5 Business Day Fabrication",
    ],
    ctaText: "Upload Outfit Now",
    ctaLink: "/upload",
    highlight: true,
  },
  {
    name: "Atelier Duet",
    subtitle: "Couples & Coordinated Sets",
    price: "$69",
    unit: "for 2 matching garments",
    badge: "Save 15%",
    description: "Create matching or complementary custom outfits from single or multiple wardrobe scans.",
    features: [
      "All Aura Solo capabilities included",
      "Coordinated Color Palette Synchronization",
      "Dual Sizing & Measurement Profiles",
      "Priority Dropshipping Queue",
      "Eco-Luxe Gift Packaging with Wax Seal",
      "Free Global Express Shipping",
    ],
    ctaText: "Design Coordinated Set",
    ctaLink: "/customize",
    highlight: false,
  },
  {
    name: "Merchant Guild",
    subtitle: "For Fashion Dropshippers & Brands",
    price: "$24",
    unit: "per unit (min. 10 pcs)",
    badge: "B2B Dropship API",
    description: "Seamless dropshipping integration. Send your customer orders directly to our automated smart atelier.",
    features: [
      "Custom Brand Labeling & Neck Tags",
      "Direct Customer Dropshipping (White-label)",
      "Automated CSV & Shopify API Integration",
      "High Supercomputer AI Quality Audit",
      "Volume Tier Discounts down to $16/pc",
      "Dedicated Account Sorcerer & Quality Check",
    ],
    ctaText: "Start Dropshipping",
    ctaLink: "/checkout",
    highlight: false,
  },
];

const FABRIC_PRICING = [
  { garment: "Classic T-Shirt (220gsm Organic Cotton)", basePrice: "$29.00", estFabrication: "2 days" },
  { garment: "Pleated Midi Skirt (Luxury Twill)", basePrice: "$42.00", estFabrication: "3 days" },
  { garment: "Silk Touch Blouse (Mulberry Silk Alternate)", basePrice: "$44.00", estFabrication: "3 days" },
  { garment: "Oxford Dress Shirt (Egyptian Cotton)", basePrice: "$49.00", estFabrication: "3 days" },
  { garment: "Tailored Trousers / Pants", basePrice: "$54.00", estFabrication: "3 days" },
  { garment: "Heavyweight Hoodie (450gsm French Terry)", basePrice: "$59.00", estFabrication: "3 days" },
  { garment: "Artisanal Knit Sweater (Merino Blend)", basePrice: "$64.00", estFabrication: "3 days" },
  { garment: "Bespoke A-Line / Midi Dress", basePrice: "$69.00", estFabrication: "3 days" },
  { garment: "Tailored Blazer / Jacket (Italian Wool Blend)", basePrice: "$89.00", estFabrication: "4 days" },
  { garment: "Structured Trench / Overcoat", basePrice: "$119.00", estFabrication: "5 days" },
];

export default function PricingPage() {
  const [calculatorQty, setCalculatorQty] = useState(1);
  const [includeLettering, setIncludeLettering] = useState(true);
  const [includePattern, setIncludePattern] = useState(false);
  const [includeEmbellishments, setIncludeEmbellishments] = useState(false);

  const baseRate = 29.0;
  const unitAddons =
    (includeLettering ? 6.5 : 0) +
    (includePattern ? 8.0 : 0) +
    (includeEmbellishments ? 5.0 : 0);
  const subtotal = (baseRate + unitAddons) * calculatorQty;
  const volumeDiscount = calculatorQty >= 10 ? 0.25 : calculatorQty >= 5 ? 0.15 : 0;
  const discountedTotal = subtotal * (1 - volumeDiscount);

  return (
    <div className="relative min-h-screen bg-[#0F0B1E] text-[#F8F7FF] selection:bg-purple-600 selection:text-white">
      <MagicalParticles />
      <Navbar />

      {/* Ambient background auras */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-purple-700/15 blur-[120px]" />
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-amber-300 border border-purple-500/20 mb-3">
            ✨ Transparent Dropship Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-300 via-pink-200 to-amber-300 bg-clip-text text-transparent mb-4">
            Alchemical Craftsmanship, Honest Prices
          </h1>
          <p className="text-[#C4B5FD]/80 text-base md:text-lg">
            No surprise import fees or hidden markups. From single bespoke duplicate orders to high-volume brand dropshipping.
          </p>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
                tier.highlight
                  ? "bg-gradient-to-b from-purple-900/40 via-purple-950/30 to-black/50 border-2 border-purple-500/60 shadow-[0_0_35px_rgba(124,58,237,0.3)] scale-105"
                  : "bg-white/5 border border-white/10 hover:border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-purple-300/80 mb-6">{tier.subtitle}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-black text-amber-300">{tier.price}</span>
                  <span className="text-xs text-purple-300/70">{tier.unit}</span>
                </div>

                <p className="text-xs text-purple-200/80 leading-relaxed mb-6">{tier.description}</p>

                <div className="border-t border-white/10 pt-5 space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-purple-200">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={tier.ctaLink}
                className={`w-full py-3.5 px-6 rounded-xl text-center text-xs font-bold transition-all duration-300 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-105"
                    : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                }`}
              >
                {tier.ctaText} →
              </Link>
            </div>
          ))}
        </div>

        {/* Real-time Interactive Dropship Calculator */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 mb-20 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-amber-400">⚡ Live Estimator</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                Custom Outfit Dropship Calculator
              </h2>
            </div>
            {volumeDiscount > 0 && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold animate-pulse">
                🎉 Applied {(volumeDiscount * 100).toFixed(0)}% Volume Discount!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-purple-200 mb-2">
                  <span>Batch Quantity</span>
                  <span className="text-amber-300 font-mono text-sm">{calculatorQty} unit(s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={calculatorQty}
                  onChange={(e) => setCalculatorQty(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-purple-300/60 mt-1">
                  <span>1 (Single Bespoke)</span>
                  <span>5+ (15% off)</span>
                  <span>10+ (25% off)</span>
                  <span>50 (Bulk Dropship)</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-purple-200 block">Customization Add-ons</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeLettering}
                      onChange={(e) => setIncludeLettering(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span className="text-xs text-purple-200">Lettering (+$6.50)</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={includePattern}
                      onChange={(e) => setIncludePattern(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span className="text-xs text-purple-200">Custom Weave (+$8)</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeEmbellishments}
                      onChange={(e) => setIncludeEmbellishments(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span className="text-xs text-purple-200">Hardware Detail (+$5)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Total Box (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-violet-950/40 border border-purple-500/30 p-6 flex flex-col justify-between">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Per Garment Rate:</span>
                  <span className="font-mono">${(discountedTotal / calculatorQty).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Subtotal ({calculatorQty} pcs):</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {volumeDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-300 font-semibold">
                    <span>Discount ({(volumeDiscount * 100).toFixed(0)}%):</span>
                    <span className="font-mono">-${(subtotal * volumeDiscount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Dropship Fulfillment:</span>
                  <span className="text-amber-300 font-medium">Included</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Estimated Total:</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    ${discountedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/upload"
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-105"
              >
                Scan Outfit & Lock In Price ✨
              </Link>
            </div>
          </div>
        </div>

        {/* Base Garment Catalog Table */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <h2 className="text-xl font-bold text-white mb-4">Base Silhouettes & Material Catalog</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-purple-300 uppercase tracking-wider">
                  <th className="py-3 px-4">Garment Classification</th>
                  <th className="py-3 px-4">Base Starting Price</th>
                  <th className="py-3 px-4">Fabrication Latency</th>
                  <th className="py-3 px-4">Supercomputer Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {FABRIC_PRICING.map((item) => (
                  <tr key={item.garment} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{item.garment}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">{item.basePrice}</td>
                    <td className="py-3.5 px-4 text-purple-200">{item.estFabrication}</td>
                    <td className="py-3.5 px-4 text-emerald-300">✓ 99.8% Dimensional Accuracy</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
