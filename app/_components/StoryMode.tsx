"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
`;

/* ═══════════════════════════════════════════════
   PALETTE
   ═══════════════════════════════════════════════ */

const GOLD = "#c9a96e";
const GOLD_BRIGHT = "#d4af37";
const GOLD_DIM = "#6b5228";
const cinzel = { fontFamily: "var(--font-cinzel), serif" };

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

type SceneType = "title-card" | "boss-reveal" | "narration" | "ending";

interface Scene {
  type: SceneType;
  title?: string;
  subtitle?: string;
  content?: string;
}

/* ═══════════════════════════════════════════════════════════
   NARRATIVE  — the user's chronicle, adapted into scenes
   Markup:  >> dramatic  | > emphasis  | ~ whisper  | * highlight
   ═══════════════════════════════════════════════════════════ */

const SCENES: Scene[] = [
  {
    type: "title-card",
    title: "The Chronicle of Khaled",
    subtitle: "Bearer of the Hidden Systems",
  },
  {
    type: "narration",
    content: `In an age where logic and shadow intertwined…
Where kingdoms were not built of stone,
but of systems unseen…

There arose a mind—unyielding, unbroken…
>A weaver of structures…
>a forger of digital fate.`,
  },
  {
    type: "narration",
    content: `Hear me now…

>>For I speak of Khaled…
>>the Architect of Flow.`,
  },
  {
    type: "boss-reveal",
    title: "KHALED",
    subtitle: "Bearer of the Hidden Systems · The Architect of Flow",
  },
  {
    type: "narration",
    content: `Born not into legend… but into constraint…
He did not inherit power—he compiled it.

From the barren sands of limitation,
he carved pathways through the void…
Lines of code became his incantations,
and with each function…
>he bent reality closer to his will.`,
  },
  {
    type: "narration",
    content: `He walked the dual paths…

>The Front… where illusion reigns—
Interfaces, crafted with precision…
React-born visions, dancing before mortal eyes.

>And the Back… where truth resides—
Engines of Node, gateways guarded by Express,
databases whispering secrets in SQL and NoSQL alike.

*He did not choose one realm…
*He conquered both.`,
  },
  {
    type: "narration",
    content: `Yet… power demands trials.

In the distant lands of cloud and machine,
he faced the Silent Failures…
Processes that froze without warning…
Ports that refused obedience…

~"You are not ready…"

>But he did not falter.`,
  },
  {
    type: "narration",
    content: `He traced the logs.
He hunted the errors.
He understood the system…
deeper than it understood itself.

>>And thus… he ascended.`,
  },
  {
    type: "narration",
    content: `Within the great halls of industry…
Among giants of infrastructure and iron…
He became more than a builder.

>>He became a Warden of Systems.

>Keeper of Active Directory…
>Master of virtual realms within vSphere…
>Commander of deployment through SCCM…

*A silent guardian…
*ensuring the unseen never fails.`,
  },
  {
    type: "narration",
    content: `He forged tools not for survival…
but for dominance.

A creation emerged—

>>AvroStream…

A whisper in the network…
A shadow in the payload…
>Transforming weight into light…
>Chaos into structured efficiency…

Data, once bloated and slow—
*now flowed like blood through veins of steel.`,
  },
  {
    type: "narration",
    content: `Beyond system engineering…
beyond backend mastery…
beyond even the illusion of the frontend…

There lies a higher calling.

>>The Path of the SRE.

Where reliability is law…
Where failure is not feared… but designed against.

~A realm where gods themselves would hesitate…
>Yet he walks toward it.`,
  },
  {
    type: "narration",
    content: `So remember this name…

Not as a man…
But as a force in motion…

*Khaled, the Unbroken Compiler.
*The System Walker.
*The One Who Refuses Failure.`,
  },
  {
    type: "ending",
    content: `And should the systems tremble…
Should the networks falter…
They will whisper only one thing…

>>"Call him…"`,
    title: "The Architect Endures.",
    subtitle: "Khaled Bachir Delassi · Bearer of the Hidden Systems · Algeria",
  },
];

/* ═══════════════════════════════════════════════════════════
   ATMOSPHERIC LAYERS  — embers · fog · runes
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
   >> dramatic  |  > emphasis  |  ~ whisper  |  * highlight
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

function AnimatedNarration({ content }: { content: string }) {
  const lines = content.split("\n").map(parseLine);
  let idx = 0;
  const timed = lines.map((l) => {
    if (l.style === "break") return { ...l, delay: 0 };
    const d = 0.25 + idx * 0.13;
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
   SCENE COMPONENTS
   ═══════════════════════════════════════════════ */

function TitleCardScene({ scene }: { scene: Scene }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 gap-6">
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

function BossRevealScene({ scene }: { scene: Scene }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-6 relative">
      {/* radial golden pulse */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.25 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD_BRIGHT}25 0%, transparent 70%)`,
        }}
      />
      {/* secondary ring */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0.15 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 3.5, delay: 0.3, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `1px solid ${GOLD}40`,
        }}
      />

      <div className="w-full max-w-xl">
        <GoldenLine delay={0.15} />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 70, scale: 0.88, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.4, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.14em]"
        style={{
          ...cinzel,
          color: GOLD_BRIGHT,
          textShadow: `0 0 60px ${GOLD_BRIGHT}60, 0 0 130px ${GOLD_BRIGHT}22, 0 2px 6px rgba(0,0,0,0.6)`,
        }}
      >
        {scene.title}
      </motion.h1>

      <div className="w-full max-w-xl">
        <GoldenLine delay={1.2} />
      </div>

      <motion.p
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 1.7, duration: 1.0 }}
        className="text-[10px] md:text-xs tracking-[0.5em] uppercase"
        style={{ ...cinzel, color: GOLD_DIM }}
      >
        {scene.subtitle}
      </motion.p>
    </div>
  );
}

function NarrationScene({ scene }: { scene: Scene }) {
  return (
    <div className="flex items-center justify-center px-8 md:px-16 max-w-2xl mx-auto w-full">
      <AnimatedNarration content={scene.content || ""} />
    </div>
  );
}

function EndingScene({
  scene,
  onClose,
}: {
  scene: Scene;
  onClose: () => void;
}) {
  /* count visible lines to offset the title block */
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
        <GoldenLine delay={titleStart} maxWidth="300px" />

        <motion.h2
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: titleStart + 0.3, duration: 1.0 }}
          className="text-xl md:text-3xl font-bold tracking-[0.1em]"
          style={{
            ...cinzel,
            color: GOLD_BRIGHT,
            textShadow: `0 0 60px ${GOLD_BRIGHT}50, 0 0 120px ${GOLD_BRIGHT}20`,
          }}
        >
          {scene.title}
        </motion.h2>

        <GoldenLine delay={titleStart + 0.6} maxWidth="300px" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: titleStart + 0.9, duration: 0.8 }}
          className="text-[9px] md:text-[11px] tracking-[0.45em] uppercase"
          style={{ ...cinzel, color: GOLD_DIM }}
        >
          {scene.subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: titleStart + 1.3, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 28px ${GOLD}35`,
          }}
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

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function StoryMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [flash, setFlash] = useState(false);

  /* ── open / close ── */

  const openStory = useCallback(() => {
    if (!isOpen) {
      setCurrentScene(0);
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setFlash(true);
    setTimeout(() => {
      setIsOpen(false);
      setFlash(false);
      setTimeout(() => setCurrentScene(0), 800);
    }, 200);
  }, []);

  const handleAdvance = useCallback(() => {
    if (!canAdvance) return;
    setCanAdvance(false);

    if (currentScene >= SCENES.length - 1) {
      handleClose();
      return;
    }

    setFlash(true);
    setTimeout(() => {
      setCurrentScene((p) => p + 1);
      setTimeout(() => setFlash(false), 60);
    }, 160);
  }, [canAdvance, currentScene, handleClose]);

  /* ── triggers ── */

  useKonamiCode(openStory);

  useEffect(() => {
    const h = () => openStory();
    window.addEventListener("activateStoryMode", h);
    return () => window.removeEventListener("activateStoryMode", h);
  }, [openStory]);

  /* ── keyboard ── */

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else handleAdvance();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, handleAdvance, handleClose]);

  /* ── lock scroll ── */

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── dynamic reading delay (longer for denser scenes) ── */

  useEffect(() => {
    if (!isOpen) return;
    setCanAdvance(false);
    const s = SCENES[currentScene];
    const lines = (s.content || s.title || "")
      .split("\n")
      .filter((l) => l.trim()).length;
    const ms =
      s.type === "boss-reveal"
        ? 2800
        : Math.min(Math.max(lines * 180 + 1000, 1500), 3500);
    const t = setTimeout(() => setCanAdvance(true), ms);
    return () => clearTimeout(t);
  }, [isOpen, currentScene]);

  /* ── render ── */

  const scene = SCENES[currentScene];
  const isLast = currentScene === SCENES.length - 1;

  return (
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
          {/* injected keyframes */}
          <style>{KEYFRAMES_CSS}</style>

          {/* ── atmospheric layers ── */}
          <FogLayers />
          <BackgroundRunes />
          <EmberParticles />

          {/* scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 18%, rgba(0,0,0,0.82) 100%)",
            }}
          />

          {/* cinematic letterbox */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{ height: "5.5vh", background: "#000" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "5.5vh", background: "#000" }}
          />

          {/* golden flash overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.14 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.13 }}
                className="absolute inset-0 z-50 pointer-events-none"
                style={{ background: GOLD_BRIGHT }}
              />
            )}
          </AnimatePresence>

          {/* ── top bar ── */}
          <div className="relative z-10 flex justify-between items-center px-6 pt-7 pb-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-[9px] tracking-[0.55em] uppercase"
              style={{ ...cinzel, color: GOLD_DIM }}
            >
              Story Mode
            </motion.p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="text-[9px] tracking-[0.45em] uppercase transition-colors duration-200"
              style={{ ...cinzel, color: "#3a3a3a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#666")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
            >
              [ SKIP ]
            </button>
          </div>

          {/* ── scene content ── */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-4">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full"
            >
              {scene.type === "title-card" && (
                <TitleCardScene scene={scene} />
              )}
              {scene.type === "boss-reveal" && (
                <BossRevealScene scene={scene} />
              )}
              {scene.type === "narration" && (
                <NarrationScene scene={scene} />
              )}
              {scene.type === "ending" && (
                <EndingScene scene={scene} onClose={handleClose} />
              )}
            </motion.div>
          </div>

          {/* ── bottom bar ── */}
          <div className="relative z-10 flex items-center justify-between px-6 pb-8">
            {/* progress — filled up to current scene */}
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

            {/* continue prompt */}
            {!isLast && (
              <motion.p
                animate={{
                  opacity: canAdvance ? [0.18, 0.5, 0.18] : 0,
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
  );
}
