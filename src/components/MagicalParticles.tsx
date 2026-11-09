"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(124, 58, 237, 0.6)",   // purple
  "rgba(167, 139, 250, 0.5)",  // light purple
  "rgba(245, 158, 11, 0.5)",   // gold
  "rgba(232, 168, 124, 0.4)",  // rose gold
  "rgba(240, 171, 252, 0.4)",  // pink
  "rgba(196, 181, 253, 0.5)",  // lavender
];

export default function MagicalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.7 + 0.3,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}

      {/* Larger drifting sparkles */}
      {particles.slice(0, 15).map((p) => (
        <span
          key={`drift-${p.id}`}
          className="absolute animate-drift"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: `${p.size + 1}px`,
            height: `${p.size + 1}px`,
            backgroundColor: p.color,
            borderRadius: "50%",
            animationDuration: `${p.duration + 10}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
        />
      ))}

      {/* Ambient aurora glow blobs */}
      <div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 171, 252, 0.2) 0%, transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "2s",
        }}
      />
    </div>
  );
}
