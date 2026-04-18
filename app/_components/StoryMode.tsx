"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "../_hooks/useKonamiCode";

/* ═══════════════════════════════════════════════════════════
   CSS KEYFRAMES — injected via <style> inside the overlay
   ═══════════════════════════════════════════════════════════ */

const KEYFRAMES_CSS = `
@keyframes ember-rise {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  8%   { opacity: var(--eo); }
  80%  { opacity: calc(var(--eo) * 0.5); }
  100% { transform: translateY(-108vh) translateX(var(--ed)) scale(0.15); opacity: 0; }
}
@keyframes fog-1 {
  0%   { transform: translateX(-4%) scaleX(1.1); }
  100% { transform: translateX(4%) scaleX(1); }
}
@keyframes fog-2 {
  0%   { transform: translateX(4%) scaleX(1); }
  100% { transform: translateX(-4%) scaleX(1.1); }
}
@keyframes rune-breathe {
  0%, 100% { opacity: 0; }
  50%      { opacity: var(--ro); }
}
@keyframes ray-rotate {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes sigil-pulse {
  0%, 100% { filter: drop-shadow(0 0 6px var(--sg)) drop-shadow(0 0 14px var(--sg)); }
  50%      { filter: drop-shadow(0 0 14px var(--sg)) drop-shadow(0 0 30px var(--sg)); }
}
@keyframes boss-sigil-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

/* ═══════════════════════════════════════════════
   PALETTE
   ═══════════════════════════════════════════════ */

const GOLD = "#c9a96e";
const GOLD_BRIGHT = "#d4af37";
const GOLD_DIM = "#6b5228";
const cinzel = { fontFamily: "var(--font-cinzel), serif" };

/* per-scene mood palettes — overlay tint + sigil glow color */
const PALETTES = {
  mystery:    { tint: "rgba(20, 35, 60, 0.32)",  glow: "#7b9bcf" },
  impact:     { tint: "rgba(80, 12, 5, 0.32)",   glow: "#ff7a3d" },
  forge:      { tint: "rgba(60, 30, 5, 0.18)",   glow: "#d4af37" },
  trials:     { tint: "rgba(60, 8, 5, 0.32)",    glow: "#b85a30" },
  warden:     { tint: "rgba(40, 25, 5, 0.16)",   glow: "#c9a96e" },
  sre:        { tint: "rgba(15, 40, 55, 0.28)",  glow: "#8db4d4" },
  apotheosis: { tint: "rgba(80, 60, 18, 0.18)",  glow: "#ffd966" },
} as const;
type PaletteKey = keyof typeof PALETTES;

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

type SceneType = "title-card" | "boss-reveal" | "narration" | "ending";

type SigilKey =
  | "crest"
  | "waves"
  | "boss-mark"
  | "tree"
  | "dual-paths"
  | "shield"
  | "ascend"
  | "tower"
  | "stream"
  | "stack"
  | "infinity"
  | "rune"
  | "seal";

interface Scene {
  type: SceneType;
  title?: string;
  subtitle?: string;
  content?: string;
  palette: PaletteKey;
  sigil: SigilKey;
}

/* ═══════════════════════════════════════════════════════════
   NARRATIVE  — 15 scenes, adapted from the voice script
   Markup:  >> dramatic  | > emphasis  | ~ whisper  | * highlight
   ═══════════════════════════════════════════════════════════ */

const SCENES: Scene[] = [
  {
    type: "title-card",
    title: "The Chronicle of Khaled",
    subtitle: "Bearer of the Hidden Systems",
    palette: "mystery",
    sigil: "crest",
  },
  {
    type: "narration",
    palette: "mystery",
    sigil: "tree",
    content: `In an age… where logic and shadow intertwine…
Where systems govern what kingdoms once did…

There arose a mind…
>unyielding…
>unbroken.`,
  },
  {
    type: "boss-reveal",
    title: "KHALED",
    subtitle: "Khaled Bachir Delassi · Master of Information Systems",
    palette: "impact",
    sigil: "boss-mark",
  },
  {
    type: "narration",
    palette: "forge",
    sigil: "rune",
    content: `From the lands of Laghouat…
Forged through discipline…

>Master of Information Systems…
>Seeker of structure in chaos.

He did not inherit power…

>>He engineered it.`,
  },
  {
    type: "narration",
    palette: "forge",
    sigil: "tree",
    content: `Where others saw problems…
>He built solutions at scale.

A system of trade…
A marketplace of many sellers…

Where data flows…
Transactions accelerate…
*And performance rises… beyond expectation.`,
  },
  {
    type: "narration",
    palette: "warden",
    sigil: "waves",
    content: `He forged platforms.

>>Kalima.

An intelligent system…
Where language is not taught… but constructed.

>AI-driven learning…
>Adaptive paths…
>Systems that think… and respond…

*Improving retention…
*Shaping understanding…
*Bending education to the will of design.`,
  },
  {
    type: "narration",
    palette: "warden",
    sigil: "dual-paths",
    content: `He built commerce.

A multi-seller domain…
Where sellers rise…
And systems sustain them.

>Optimized transactions…
>Accelerated performance…
*Elevated engagement beyond the ordinary.`,
  },
  {
    type: "narration",
    palette: "warden",
    sigil: "tower",
    content: `And in the realm of institutions…
He entered the domain of systems at scale.

>>At CNAS…

He optimized search across vast knowledge…
Reduced time from minutes… to moments.

>Integrated intelligent indexing…
>Empowered users…
*Transformed inefficiency into speed.`,
  },
  {
    type: "narration",
    palette: "forge",
    sigil: "ascend",
    content: `But Khaled does not merely build…

>>He optimizes reality itself.

Queries refined…
>Latency reduced by forty percent…
Systems accelerated…
Experiences transformed.

*Dashboards rise in real time…
*Decisions made with clarity…
*Data no longer hidden… but revealed.`,
  },
  {
    type: "narration",
    palette: "forge",
    sigil: "stack",
    content: `He commands the full stack.

>Frontend… where React shapes perception…
>Backend… where Node.js and Express enforce logic…
>Databases… where PostgreSQL and MySQL preserve truth…

>Cloud systems… deployed on AWS…
>Infrastructure… controlled and maintained.`,
  },
  {
    type: "narration",
    palette: "trials",
    sigil: "shield",
    content: `But systems demand more than skill.

>>They demand resilience.

~Servers fail.
~Pipelines break.
~Systems collapse under pressure.

>But he adapts.

CI/CD pipelines automated…
Downtime reduced…
*Infrastructure stabilized…
*Systems made reliable.`,
  },
  {
    type: "narration",
    palette: "warden",
    sigil: "stream",
    content: `And still…
He builds beyond expectation.

>>AvroStream.

A system not of appearance… but of efficiency.

>Data transformed…
>Payloads reduced…
>Performance amplified…

Where JSON once burdened the network…
*Binary flow now dominates.`,
  },
  {
    type: "narration",
    palette: "sre",
    sigil: "infinity",
    content: `And yet… this is not his final form.

He advances… toward a higher path.

A path where systems are not only built…
But made fault-tolerant…

>Where reliability is engineered…
>And failure is anticipated.

>>The path of Site Reliability Engineering.`,
  },
  {
    type: "narration",
    palette: "apotheosis",
    sigil: "rune",
    content: `So remember this name…

Not as a developer…
Not as an engineer…

>>But as a force within systems themselves.

*Khaled.
*The Architect of Flow.
*The System Engineer.
*The Builder of Scalable Realities.`,
  },
  {
    type: "ending",
    palette: "apotheosis",
    sigil: "seal",
    content: `And when your systems fail…
When your infrastructure breaks…

There will be only one command…

>>"Call him."`,
    title: "The Architect Endures.",
    subtitle: "Khaled Bachir Delassi · System Engineer · Laghouat, Algeria",
  },
];

/* ═══════════════════════════════════════════════════════════
   ATMOSPHERIC LAYERS  — embers · fog · runes · god rays
   ═══════════════════════════════════════════════════════════ */

function EmberParticles() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        sz: 1.5 + Math.random() * 3,
        dur: 8 + Math.random() * 14,
        del: Math.random() * 12,
        drift: -35 + Math.random() * 70,
        op: 0.12 + Math.random() * 0.5,
      })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.left}%`,
              bottom: "-12px",
              width: `${p.sz}px`,
              height: `${p.sz}px`,
              background: `radial-gradient(circle, ${GOLD_BRIGHT} 0%, ${GOLD} 50%, transparent 70%)`,
              boxShadow: `0 0 ${p.sz * 3}px ${GOLD_BRIGHT}55`,
              animation: `ember-rise ${p.dur}s ${p.del}s infinite linear`,
              "--ed": `${p.drift}px`,
              "--eo": p.op,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function FogLayers() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(24,13,3,0.22) 25%, transparent 50%, rgba(24,13,3,0.14) 75%, transparent 100%)",
          animation: "fog-1 20s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, transparent 0%, rgba(24,13,3,0.14) 35%, transparent 55%, rgba(24,13,3,0.2) 80%, transparent 100%)",
          animation: "fog-2 26s ease-in-out infinite alternate",
        }}
      />
    </>
  );
}

function BackgroundRunes() {
  const runes = useMemo(
    () =>
      ["◈", "⟁", "✦", "⊕", "◇", "△", "⬡", "⊹", "◈", "✦", "⟁", "⊕"].map(
        (s, i) => ({
          s,
          x: 4 + i * 8 + Math.random() * 4,
          y: 6 + Math.random() * 82,
          sz: 14 + Math.random() * 28,
          dur: 14 + Math.random() * 14,
          del: Math.random() * 12,
          mo: 0.025 + Math.random() * 0.04,
          rot: Math.random() * 360,
        })
      ),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {runes.map((r, i) => (
        <span
          key={i}
          className="absolute"
          style={
            {
              left: `${r.x}%`,
              top: `${r.y}%`,
              fontSize: `${r.sz}px`,
              color: GOLD,
              transform: `rotate(${r.rot}deg)`,
              animation: `rune-breathe ${r.dur}s ${r.del}s infinite ease-in-out`,
              "--ro": r.mo,
            } as React.CSSProperties
          }
        >
          {r.s}
        </span>
      ))}
    </div>
  );
}

function GodRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "200vmax",
          height: "200vmax",
          background: `repeating-conic-gradient(from 0deg, ${GOLD_BRIGHT}10 0deg 3deg, transparent 3deg 24deg)`,
          animation: "ray-rotate 120s linear infinite",
          mixBlendMode: "screen",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

function MouseParallax({
  strength,
  children,
}: {
  strength: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [strength]);
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ transition: "transform 0.6s ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGILS — animated SVG line-art per scene
   ═══════════════════════════════════════════════════════════ */

const drawAnim = (delay = 0, dur = 2.2) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { delay, duration: dur, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeIn = (delay = 0, dur = 0.5) => ({
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay, duration: dur, ease: "easeOut" as const },
});

function SigilFrame({
  glow,
  size = "normal",
  children,
}: {
  glow: string;
  size?: "normal" | "large";
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={
        {
          color: glow,
          "--sg": glow,
          animation: "sigil-pulse 4s ease-in-out infinite",
          opacity: size === "large" ? 0.95 : 0.85,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

function SigilCrest() {
  return (
    <svg viewBox="0 0 100 70" width="120" height="84" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M 22 32 L 30 14 L 38 26 L 50 8 L 62 26 L 70 14 L 78 32 Z" {...drawAnim(0.1)} />
      <motion.line x1="22" y1="32" x2="78" y2="32" {...drawAnim(0.6, 1.2)} />
      <motion.circle cx="30" cy="14" r="1.4" fill="currentColor" stroke="none" {...fadeIn(1.4)} />
      <motion.circle cx="50" cy="8" r="1.6" fill="currentColor" stroke="none" {...fadeIn(1.5)} />
      <motion.circle cx="70" cy="14" r="1.4" fill="currentColor" stroke="none" {...fadeIn(1.4)} />
      <motion.line x1="14" y1="50" x2="86" y2="50" {...drawAnim(1.2, 1.4)} />
      <motion.path d="M 14 50 L 10 47 M 14 50 L 10 53" {...drawAnim(2.2, 0.6)} />
      <motion.path d="M 86 50 L 90 47 M 86 50 L 90 53" {...drawAnim(2.2, 0.6)} />
      <motion.circle cx="50" cy="50" r="3" {...drawAnim(2.0, 0.8)} />
    </svg>
  );
}

function SigilWaves() {
  return (
    <svg viewBox="0 0 80 80" width="100" height="100" stroke="currentColor" fill="none" strokeWidth="0.7">
      <motion.circle cx="40" cy="40" r="6" {...drawAnim(0.1, 0.8)} />
      <motion.circle cx="40" cy="40" r="14" {...drawAnim(0.5, 1.0)} />
      <motion.circle cx="40" cy="40" r="22" {...drawAnim(1.0, 1.2)} />
      <motion.circle cx="40" cy="40" r="30" {...drawAnim(1.5, 1.4)} strokeDasharray="2 3" />
      <motion.circle cx="40" cy="40" r="3" fill="currentColor" stroke="none" {...fadeIn(2.0)} />
    </svg>
  );
}

function SigilBossMark() {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 120 120" width="220" height="220" stroke="currentColor" fill="none" strokeWidth="0.8">
      <motion.circle cx="60" cy="60" r="54" {...drawAnim(0.0, 1.4)} />
      <motion.circle cx="60" cy="60" r="46" {...drawAnim(0.2, 1.4)} strokeDasharray="1 4" />
      {spokes.map((a, i) => (
        <motion.line
          key={i}
          x1={60 + Math.cos((a * Math.PI) / 180) * 30}
          y1={60 + Math.sin((a * Math.PI) / 180) * 30}
          x2={60 + Math.cos((a * Math.PI) / 180) * 44}
          y2={60 + Math.sin((a * Math.PI) / 180) * 44}
          {...drawAnim(0.5 + i * 0.05, 0.5)}
        />
      ))}
      <motion.path d="M 60 30 L 68 56 L 88 56 L 72 72 L 78 92 L 60 80 L 42 92 L 48 72 L 32 56 L 52 56 Z" {...drawAnim(1.0, 1.6)} />
      <motion.circle cx="60" cy="60" r="4" fill="currentColor" stroke="none" {...fadeIn(2.4)} />
    </svg>
  );
}

function SigilTree() {
  return (
    <svg viewBox="0 0 100 80" width="110" height="88" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round">
      <motion.line x1="50" y1="74" x2="50" y2="20" {...drawAnim(0.1, 1.2)} />
      <motion.line x1="50" y1="40" x2="32" y2="28" {...drawAnim(0.8, 0.7)} />
      <motion.line x1="50" y1="40" x2="68" y2="28" {...drawAnim(0.8, 0.7)} />
      <motion.line x1="50" y1="55" x2="38" y2="48" {...drawAnim(1.1, 0.7)} />
      <motion.line x1="50" y1="55" x2="62" y2="48" {...drawAnim(1.1, 0.7)} />
      <motion.circle cx="32" cy="28" r="2.2" fill="currentColor" stroke="none" {...fadeIn(1.5)} />
      <motion.circle cx="68" cy="28" r="2.2" fill="currentColor" stroke="none" {...fadeIn(1.5)} />
      <motion.circle cx="50" cy="20" r="2.6" fill="currentColor" stroke="none" {...fadeIn(1.7)} />
      <motion.circle cx="38" cy="48" r="1.8" fill="currentColor" stroke="none" {...fadeIn(1.9)} />
      <motion.circle cx="62" cy="48" r="1.8" fill="currentColor" stroke="none" {...fadeIn(1.9)} />
    </svg>
  );
}

function SigilDualPaths() {
  return (
    <svg viewBox="0 0 120 60" width="160" height="80" stroke="currentColor" fill="none" strokeWidth="0.7">
      <motion.circle cx="44" cy="30" r="22" {...drawAnim(0.1, 1.4)} />
      <motion.circle cx="76" cy="30" r="22" {...drawAnim(0.4, 1.4)} />
      <motion.line x1="60" y1="10" x2="60" y2="50" {...drawAnim(1.4, 0.8)} strokeDasharray="2 2" />
      <motion.circle cx="60" cy="30" r="2" fill="currentColor" stroke="none" {...fadeIn(2.2)} />
    </svg>
  );
}

function SigilShield() {
  return (
    <svg viewBox="0 0 80 90" width="100" height="112" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round">
      <motion.path d="M 40 8 L 70 18 L 70 50 Q 70 72 40 84 Q 10 72 10 50 L 10 18 Z" {...drawAnim(0.1, 1.6)} />
      <motion.path d="M 40 30 L 36 44 L 44 50 L 38 64" {...drawAnim(1.6, 1.0)} />
      <motion.path d="M 28 38 L 22 46" {...drawAnim(2.2, 0.5)} />
      <motion.path d="M 52 42 L 60 50" {...drawAnim(2.2, 0.5)} />
    </svg>
  );
}

function SigilAscend() {
  return (
    <svg viewBox="0 0 80 90" width="100" height="112" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round">
      <motion.path d="M 40 80 L 40 18" {...drawAnim(0.1, 1.4)} />
      <motion.path d="M 28 30 L 40 18 L 52 30" {...drawAnim(1.4, 0.8)} />
      <motion.line x1="20" y1="62" x2="60" y2="62" {...drawAnim(0.5, 0.6)} />
      <motion.line x1="24" y1="50" x2="56" y2="50" {...drawAnim(0.8, 0.6)} />
      <motion.line x1="28" y1="38" x2="52" y2="38" {...drawAnim(1.1, 0.6)} />
    </svg>
  );
}

function SigilTower() {
  return (
    <svg viewBox="0 0 80 100" width="100" height="124" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round">
      <motion.rect x="20" y="74" width="40" height="20" {...drawAnim(0.1, 1.0)} />
      <motion.rect x="26" y="50" width="28" height="24" {...drawAnim(0.4, 1.0)} />
      <motion.rect x="32" y="28" width="16" height="22" {...drawAnim(0.7, 1.0)} />
      <motion.path d="M 32 28 L 32 22 L 36 22 L 36 28 M 40 28 L 40 22 L 44 22 L 44 28" {...drawAnim(1.4, 0.8)} />
      <motion.line x1="40" y1="22" x2="40" y2="8" {...drawAnim(1.7, 0.6)} />
      <motion.path d="M 40 8 L 50 12 L 40 16 Z" {...drawAnim(2.0, 0.5)} fill="currentColor" />
      <motion.circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" {...fadeIn(2.2)} />
    </svg>
  );
}

function SigilStream() {
  const xs = [18, 52, 88, 122];
  return (
    <svg viewBox="0 0 140 60" width="180" height="78" stroke="currentColor" fill="none" strokeWidth="0.7">
      <motion.path d="M 18 30 Q 35 10 52 30" {...drawAnim(0.1, 1.0)} />
      <motion.path d="M 52 30 Q 70 50 88 30" {...drawAnim(0.4, 1.0)} />
      <motion.path d="M 88 30 Q 105 10 122 30" {...drawAnim(0.7, 1.0)} />
      <motion.path d="M 18 30 L 122 30" {...drawAnim(1.2, 1.4)} strokeDasharray="2 2" />
      {xs.map((x, i) => (
        <motion.circle key={i} cx={x} cy={30} r="3.5" fill="currentColor" stroke="none" {...fadeIn(1.4 + i * 0.15, 0.5)} />
      ))}
    </svg>
  );
}

function SigilStack() {
  return (
    <svg viewBox="0 0 80 62" width="110" height="84" stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinecap="round">
      <motion.rect x="10" y="44" width="60" height="10" {...drawAnim(0.1, 0.9)} />
      <motion.rect x="16" y="30" width="48" height="10" {...drawAnim(0.4, 0.9)} />
      <motion.rect x="22" y="16" width="36" height="10" {...drawAnim(0.7, 0.9)} />
      <motion.rect x="28" y="2"  width="24" height="10" {...drawAnim(1.0, 0.9)} />
      <motion.circle cx="40" cy="49" r="1.3" fill="currentColor" stroke="none" {...fadeIn(1.5)} />
      <motion.circle cx="40" cy="35" r="1.3" fill="currentColor" stroke="none" {...fadeIn(1.6)} />
      <motion.circle cx="40" cy="21" r="1.3" fill="currentColor" stroke="none" {...fadeIn(1.7)} />
      <motion.circle cx="40" cy="7"  r="1.3" fill="currentColor" stroke="none" {...fadeIn(1.8)} />
    </svg>
  );
}

function SigilInfinity() {
  return (
    <svg viewBox="0 0 120 60" width="160" height="80" stroke="currentColor" fill="none" strokeWidth="0.7">
      <motion.path d="M 30 30 Q 30 12 45 12 Q 60 12 60 30 Q 60 48 75 48 Q 90 48 90 30 Q 90 12 75 12 Q 60 12 60 30 Q 60 48 45 48 Q 30 48 30 30 Z" {...drawAnim(0.1, 2.4)} />
      <motion.circle cx="60" cy="30" r="3" fill="currentColor" stroke="none" {...fadeIn(2.6)} />
    </svg>
  );
}

function SigilRune() {
  return (
    <svg viewBox="0 0 80 90" width="100" height="112" stroke="currentColor" fill="none" strokeWidth="0.9" strokeLinecap="round">
      <motion.path d="M 40 8 L 40 82" {...drawAnim(0.1, 1.2)} />
      <motion.path d="M 40 24 L 22 14" {...drawAnim(0.6, 0.8)} />
      <motion.path d="M 40 24 L 58 14" {...drawAnim(0.6, 0.8)} />
      <motion.path d="M 40 50 L 22 40" {...drawAnim(0.9, 0.8)} />
      <motion.path d="M 40 50 L 58 40" {...drawAnim(0.9, 0.8)} />
      <motion.circle cx="40" cy="68" r="6" {...drawAnim(1.4, 0.8)} />
    </svg>
  );
}

function SigilSeal() {
  return (
    <svg viewBox="0 0 100 100" width="140" height="140" stroke="currentColor" fill="none" strokeWidth="0.7">
      <motion.circle cx="50" cy="50" r="44" {...drawAnim(0.1, 1.6)} />
      <motion.circle cx="50" cy="50" r="38" {...drawAnim(0.3, 1.6)} strokeDasharray="2 3" />
      <motion.circle cx="50" cy="50" r="28" {...drawAnim(0.6, 1.4)} />
      <motion.path d="M 35 52 L 40 40 L 45 50 L 50 35 L 55 50 L 60 40 L 65 52 Z" {...drawAnim(1.4, 1.4)} />
      <motion.line x1="35" y1="52" x2="65" y2="52" {...drawAnim(1.8, 0.8)} />
      <motion.circle cx="50" cy="60" r="1.8" fill="currentColor" stroke="none" {...fadeIn(2.4)} />
    </svg>
  );
}

const SIGILS: Record<SigilKey, React.FC> = {
  crest: SigilCrest,
  waves: SigilWaves,
  "boss-mark": SigilBossMark,
  tree: SigilTree,
  "dual-paths": SigilDualPaths,
  shield: SigilShield,
  ascend: SigilAscend,
  tower: SigilTower,
  stream: SigilStream,
  stack: SigilStack,
  infinity: SigilInfinity,
  rune: SigilRune,
  seal: SigilSeal,
};

function SceneSigil({
  sigil,
  glow,
  size = "normal",
}: {
  sigil: SigilKey;
  glow: string;
  size?: "normal" | "large";
}) {
  const Component = SIGILS[sigil];
  return (
    <SigilFrame glow={glow} size={size}>
      <Component />
    </SigilFrame>
  );
}

/* ═══════════════════════════════════════════════
   DECORATIVE LINE
   ═══════════════════════════════════════════════ */

function GoldenLine({
  delay,
  maxWidth = "100%",
}: {
  delay: number;
  maxWidth?: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 1.2, ease: "easeInOut" }}
      style={{
        height: "1px",
        width: "100%",
        maxWidth,
        background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
        transformOrigin: "center",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   TEXT RENDERER — parses markup lines into styled elements
   ═══════════════════════════════════════════════════════════ */

type LineStyle = "normal" | "emphasis" | "dramatic" | "whisper" | "highlight" | "break";

function parseLine(raw: string): { text: string; style: LineStyle } {
  const t = raw.trimEnd();
  if (t === "") return { text: "", style: "break" };
  if (t.startsWith(">>")) return { text: t.slice(2).trim(), style: "dramatic" };
  if (t.startsWith(">")) return { text: t.slice(1).trim(), style: "emphasis" };
  if (t.startsWith("~")) return { text: t.slice(1).trim(), style: "whisper" };
  if (t.startsWith("*")) return { text: t.slice(1).trim(), style: "highlight" };
  return { text: t, style: "normal" };
}

const TEXT_CLS: Record<LineStyle, string> = {
  normal: "text-sm md:text-base",
  emphasis: "text-base md:text-lg",
  dramatic: "text-lg md:text-2xl lg:text-3xl font-bold",
  whisper: "text-xs md:text-sm italic",
  highlight: "text-sm md:text-base",
  break: "",
};
const TEXT_COLOR: Record<LineStyle, string> = {
  normal: "#8a8a8a",
  emphasis: GOLD,
  dramatic: GOLD_BRIGHT,
  whisper: "#484848",
  highlight: GOLD,
  break: "transparent",
};

function AnimatedNarration({ content, startDelay = 0 }: { content: string; startDelay?: number }) {
  const lines = content.split("\n").map(parseLine);
  let idx = 0;
  const timed = lines.map((l) => {
    if (l.style === "break") return { ...l, delay: 0 };
    const d = startDelay + 0.25 + idx * 0.13;
    idx++;
    return { ...l, delay: d };
  });

  return (
    <div className="flex flex-col gap-1 items-center text-center">
      {timed.map((l, i) => {
        if (l.style === "break") return <div key={i} className="h-4" />;
        const big = l.style === "dramatic";
        return (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: big ? 18 : 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: l.delay,
              duration: big ? 0.9 : 0.55,
              ease: "easeOut",
            }}
            className={`leading-relaxed ${TEXT_CLS[l.style]}`}
            style={{
              ...cinzel,
              color: TEXT_COLOR[l.style],
              ...(big
                ? {
                    textShadow: `0 0 30px ${GOLD_BRIGHT}55, 0 0 70px ${GOLD_BRIGHT}20`,
                  }
                : {}),
            }}
          >
            {l.text}
          </motion.p>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KINETIC NAME — letters fly in from random positions
   ═══════════════════════════════════════════════ */

function KineticName({ name, baseDelay = 0.4 }: { name: string; baseDelay?: number }) {
  const letters = useMemo(
    () =>
      name.split("").map((ch) => ({
        ch,
        x: (Math.random() - 0.5) * 80,
        y: -30 - Math.random() * 40,
        rot: (Math.random() - 0.5) * 35,
      })),
    [name]
  );

  return (
    <span className="inline-flex">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: l.x, y: l.y, rotate: l.rot, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{
            delay: baseDelay + i * 0.07,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {l.ch === " " ? "\u00A0" : l.ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   HOLD-TO-SKIP
   ═══════════════════════════════════════════════ */

function HoldToSkip({ onSkip }: { onSkip: () => void }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const HOLD_MS = 900;

  const cancel = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setProgress(0);
  }, []);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      startRef.current = performance.now();
      const tick = () => {
        const p = Math.min(1, (performance.now() - startRef.current) / HOLD_MS);
        setProgress(p);
        if (p >= 1) {
          cancel();
          onSkip();
        } else {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [cancel, onSkip]
  );

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const r = 12;
  const c = 2 * Math.PI * r;

  return (
    <button
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      onClick={(e) => e.stopPropagation()}
      className="relative flex items-center gap-2 group cursor-pointer"
      style={{ ...cinzel }}
    >
      <svg width="32" height="32" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="16" cy="16" r={r} fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
        <circle
          cx="16"
          cy="16"
          r={r}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          strokeLinecap="round"
          style={{ transition: progress === 0 ? "stroke-dashoffset 0.3s" : "none" }}
        />
      </svg>
      <span
        className="text-[9px] tracking-[0.45em] uppercase transition-colors"
        style={{ color: progress > 0 ? GOLD : "#555" }}
      >
        hold to skip
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════
   SCENE COMPONENTS
   ═══════════════════════════════════════════════ */

function TitleCardScene({ scene, glow }: { scene: Scene; glow: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 gap-5">
      <SceneSigil sigil={scene.sigil} glow={glow} />
      <GoldenLine delay={0.4} maxWidth="280px" />
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.18em]"
        style={{
          ...cinzel,
          color: GOLD_BRIGHT,
          textShadow: `0 0 50px ${GOLD_BRIGHT}40, 0 0 100px ${GOLD_BRIGHT}18`,
        }}
      >
        {scene.title}
      </motion.h1>
      <GoldenLine delay={1.2} maxWidth="280px" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.0 }}
        className="text-[10px] md:text-xs tracking-[0.55em] uppercase"
        style={{ ...cinzel, color: GOLD_DIM }}
      >
        {scene.subtitle}
      </motion.p>
    </div>
  );
}

function BossRevealScene({ scene, glow }: { scene: Scene; glow: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-6 relative">
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "boss-sigil-spin 60s linear infinite",
          opacity: 0.55,
        }}
      >
        <SceneSigil sigil={scene.sigil} glow={glow} size="large" />
      </div>
      <motion.div
        initial={{ scale: 0.2, opacity: 0.3 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glow}30 0%, transparent 70%)`,
        }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0.2 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 3.5, delay: 0.3, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `1px solid ${glow}50`,
        }}
      />
      <div className="w-full max-w-xl relative z-10">
        <GoldenLine delay={0.15} />
      </div>
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.14em] relative z-10"
        style={{
          ...cinzel,
          color: GOLD_BRIGHT,
          textShadow: `0 0 60px ${GOLD_BRIGHT}60, 0 0 130px ${GOLD_BRIGHT}22, 0 2px 6px rgba(0,0,0,0.6)`,
        }}
      >
        <KineticName name={scene.title!} baseDelay={0.4} />
      </motion.h1>
      <div className="w-full max-w-xl relative z-10">
        <GoldenLine delay={1.4} />
      </div>
      <motion.p
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 1.9, duration: 1.0 }}
        className="text-[10px] md:text-xs tracking-[0.5em] uppercase relative z-10"
        style={{ ...cinzel, color: GOLD_DIM }}
      >
        {scene.subtitle}
      </motion.p>
    </div>
  );
}

function NarrationScene({ scene, glow }: { scene: Scene; glow: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 md:px-16 max-w-2xl mx-auto w-full gap-6">
      <SceneSigil sigil={scene.sigil} glow={glow} />
      <AnimatedNarration content={scene.content || ""} startDelay={0.5} />
    </div>
  );
}

function EndingScene({
  scene,
  glow,
  onClose,
}: {
  scene: Scene;
  glow: string;
  onClose: () => void;
}) {
  const visibleLines =
    scene.content?.split("\n").filter((l) => l.trim() !== "").length ?? 0;
  const titleStart = 0.3 + visibleLines * 0.13 + 1.0;

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-4 max-w-2xl mx-auto">
      {scene.content && <AnimatedNarration content={scene.content} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: titleStart, duration: 0.6 }}
        className="flex flex-col items-center gap-4 mt-2"
      >
        <SceneSigil sigil={scene.sigil} glow={glow} />
        <GoldenLine delay={titleStart + 0.2} maxWidth="300px" />
        <motion.h2
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: titleStart + 0.5, duration: 1.0 }}
          className="text-xl md:text-3xl font-bold tracking-[0.1em]"
          style={{
            ...cinzel,
            color: GOLD_BRIGHT,
            textShadow: `0 0 60px ${GOLD_BRIGHT}50, 0 0 120px ${GOLD_BRIGHT}20`,
          }}
        >
          {scene.title}
        </motion.h2>
        <GoldenLine delay={titleStart + 0.8} maxWidth="300px" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: titleStart + 1.1, duration: 0.8 }}
          className="text-[9px] md:text-[11px] tracking-[0.45em] uppercase"
          style={{ ...cinzel, color: GOLD_DIM }}
        >
          {scene.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: titleStart + 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 28px ${GOLD}35` }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="mt-3 text-[10px] md:text-xs tracking-[0.5em] uppercase border px-8 py-3 transition-colors duration-300"
          style={{ ...cinzel, color: GOLD, borderColor: GOLD_DIM }}
        >
          [ RETURN TO REALITY ]
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SOUND TOGGLE
   ═══════════════════════════════════════════════ */

function SoundToggle({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex items-center gap-2 group cursor-pointer"
      style={{ ...cinzel }}
      aria-label={muted ? "Unmute" : "Mute"}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: muted ? "#555" : GOLD }}>
        <path d="M 2 5 L 5 5 L 9 2 L 9 12 L 5 9 L 2 9 Z" />
        {muted ? (
          <>
            <line x1="11" y1="5" x2="13" y2="9" />
            <line x1="13" y1="5" x2="11" y2="9" />
          </>
        ) : (
          <>
            <path d="M 11 5 Q 12.5 7 11 9" />
            <path d="M 12.5 3.5 Q 15 7 12.5 10.5" />
          </>
        )}
      </svg>
      <span
        className="text-[9px] tracking-[0.45em] uppercase transition-colors"
        style={{ color: muted ? "#555" : GOLD }}
      >
        {muted ? "muted" : "sound"}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function StoryMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [flash, setFlash] = useState(false);
  const [muted, setMuted] = useState(false);

  const narrRef = useRef<HTMLAudioElement>(null);
  const insRef = useRef<HTMLAudioElement>(null);
  const fadeMap = useRef(new Map<HTMLAudioElement, number>());

  const fadeAudio = useCallback(
    (el: HTMLAudioElement | null, to: number, ms: number, pauseAtEnd = false) => {
      if (!el) return;
      const existing = fadeMap.current.get(el);
      if (existing) cancelAnimationFrame(existing);
      const from = el.volume;
      const startT = performance.now();
      const step = () => {
        const t = Math.min(1, (performance.now() - startT) / ms);
        el.volume = Math.max(0, Math.min(1, from + (to - from) * t));
        if (t < 1) {
          fadeMap.current.set(el, requestAnimationFrame(step));
        } else {
          fadeMap.current.delete(el);
          if (pauseAtEnd && to === 0) el.pause();
        }
      };
      fadeMap.current.set(el, requestAnimationFrame(step));
    },
    []
  );

  const openStory = useCallback(() => {
    if (!isOpen) {
      setCurrentScene(0);
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    fadeAudio(narrRef.current, 0, 600, true);
    fadeAudio(insRef.current, 0, 600, true);
    setFlash(true);
    setTimeout(() => {
      setIsOpen(false);
      setFlash(false);
      setTimeout(() => setCurrentScene(0), 800);
    }, 200);
  }, [fadeAudio]);

  const handleAdvance = useCallback(() => {
    if (!canAdvance) return;
    setCanAdvance(false);

    if (currentScene >= SCENES.length - 1) {
      handleClose();
      return;
    }

    const nextIsBoss = SCENES[currentScene + 1]?.type === "boss-reveal";
    setFlash(true);
    setTimeout(
      () => {
        setCurrentScene((p) => p + 1);
        setTimeout(() => setFlash(false), 60);
      },
      nextIsBoss ? 320 : 160
    );
  }, [canAdvance, currentScene, handleClose]);

  /* triggers */
  useKonamiCode(openStory);

  useEffect(() => {
    const h = () => openStory();
    window.addEventListener("activateStoryMode", h);
    return () => window.removeEventListener("activateStoryMode", h);
  }, [openStory]);

  /* keyboard */
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "m" || e.key === "M") setMuted((m) => !m);
      else handleAdvance();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, handleAdvance, handleClose]);

  /* lock scroll */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* dynamic reading delay */
  useEffect(() => {
    if (!isOpen) return;
    setCanAdvance(false);
    const s = SCENES[currentScene];
    const lines = (s.content || s.title || "")
      .split("\n")
      .filter((l) => l.trim()).length;
    const ms =
      s.type === "boss-reveal"
        ? 3000
        : Math.min(Math.max(lines * 180 + 1200, 1800), 4000);
    const t = setTimeout(() => setCanAdvance(true), ms);
    return () => clearTimeout(t);
  }, [isOpen, currentScene]);

  /* audio playback — start on open, fade out on close, react to mute */
  useEffect(() => {
    const n = narrRef.current;
    const i = insRef.current;
    if (!n || !i) return;

    if (isOpen) {
      if (n.paused) {
        n.currentTime = 0;
        i.currentTime = 0;
        n.volume = 0;
        i.volume = 0;
        n.play().catch(() => {});
        i.play().catch(() => {});
      }
      const targetN = muted ? 0 : 1.0;
      const targetI = muted ? 0 : 0.28;
      fadeAudio(n, targetN, 1000);
      fadeAudio(i, targetI, 1200);
    }
  }, [isOpen, muted, fadeAudio]);

  const scene = SCENES[currentScene];
  const isLast = currentScene === SCENES.length - 1;
  const palette = PALETTES[scene.palette];

  return (
    <>
      {/* audio elements — kept mounted so refs stay valid */}
      <audio ref={narrRef} src="/audio/storykhaled.wav" preload="auto" />
      <audio ref={insRef} src="/audio/ins.mp3" preload="auto" loop />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="fixed inset-0 z-[9999] flex flex-col select-none overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 40%, #180d03 0%, #0c0603 40%, #060303 68%, #000 100%)",
            }}
            onClick={handleAdvance}
          >
            <style>{KEYFRAMES_CSS}</style>

            <FogLayers />
            <MouseParallax strength={10}>
              <BackgroundRunes />
            </MouseParallax>
            <GodRays />
            <EmberParticles />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
              }}
            />

            <AnimatePresence>
              <motion.div
                key={`grade-${currentScene}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: palette.tint,
                  mixBlendMode: "soft-light",
                }}
              />
            </AnimatePresence>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 18%, rgba(0,0,0,0.82) 100%)",
              }}
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-0 left-0 right-0 pointer-events-none z-40"
              style={{ height: "5.5vh", background: "#000" }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="absolute bottom-0 left-0 right-0 pointer-events-none z-40"
              style={{ height: "5.5vh", background: "#000" }}
            />

            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      SCENES[currentScene + 1]?.type === "boss-reveal" ? 0.4 : 0.16,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="absolute inset-0 z-50 pointer-events-none"
                  style={{ background: GOLD_BRIGHT }}
                />
              )}
            </AnimatePresence>

            {/* top bar */}
            <div className="relative z-[45] flex justify-between items-center px-6 pt-7 pb-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="text-[9px] tracking-[0.55em] uppercase"
                style={{ ...cinzel, color: GOLD_DIM }}
              >
                Story Mode
              </motion.p>
              <div className="flex items-center gap-6">
                <SoundToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
                <HoldToSkip onSkip={handleClose} />
              </div>
            </div>

            {/* scene content */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-4">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
              >
                {scene.type === "title-card" && (
                  <TitleCardScene scene={scene} glow={palette.glow} />
                )}
                {scene.type === "boss-reveal" && (
                  <BossRevealScene scene={scene} glow={palette.glow} />
                )}
                {scene.type === "narration" && (
                  <NarrationScene scene={scene} glow={palette.glow} />
                )}
                {scene.type === "ending" && (
                  <EndingScene scene={scene} glow={palette.glow} onClose={handleClose} />
                )}
              </motion.div>
            </div>

            {/* bottom bar */}
            <div className="relative z-[45] flex items-center justify-between px-6 pb-8">
              <div className="flex gap-1.5 items-center">
                {SCENES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === currentScene ? 22 : 4,
                      background: i <= currentScene ? GOLD : "#2a2a2a",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ height: "3px", borderRadius: "9999px" }}
                  />
                ))}
              </div>

              {!isLast && (
                <motion.p
                  animate={{ opacity: canAdvance ? [0.18, 0.5, 0.18] : 0 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[9px] tracking-[0.45em] uppercase"
                  style={{ ...cinzel, color: "#555" }}
                >
                  — continue —
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
