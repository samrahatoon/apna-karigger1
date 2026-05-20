import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Sparkles, CalendarClock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const slides = [
  { icon: ShieldCheck, title: "Trusted Karigers", desc: "Verified, background-checked workers near you — rated by real Pakistani households.", tint: "from-orange-500/30 to-rose-500/10", glow: "rgba(255,122,26,0.45)" },
  { icon: Sparkles, title: "AI that understands you", desc: "Bolo Urdu, Roman Urdu ya English mein — humara AI samajh leta hai.", tint: "from-amber-400/30 to-fuchsia-500/10", glow: "rgba(217,70,239,0.4)" },
  { icon: Zap, title: "Instant booking", desc: "One tap to book. AI ranks providers by trust, distance, and availability.", tint: "from-yellow-400/30 to-emerald-500/10", glow: "rgba(52,211,153,0.4)" },
  { icon: CalendarClock, title: "Smart reminders", desc: "Never miss a service — AI schedules reminders & follow-ups for you.", tint: "from-cyan-400/30 to-indigo-500/10", glow: "rgba(99,102,241,0.45)" },
];

function Onboarding() {
  const [[i, dir], setI] = useState<[number, number]>([0, 1]);
  const navigate = useNavigate();
  const s = slides[i];
  const Icon = s.icon;
  const last = i === slides.length - 1;

  const go = (next: number) => {
    if (next < 0 || next >= slides.length) return;
    setI([next, next > i ? 1 : -1]);
  };

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col overflow-hidden px-6 pb-10 pt-14">
      {/* morphing background glow */}
      <AnimatePresence>
        <motion.div
          key={`bg-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${s.glow}, transparent 65%)` }}
        />
      </AnimatePresence>

      <div className="relative flex justify-between">
        <div className="text-[10px] uppercase tracking-[0.32em] text-white/40">{i + 1} / {slides.length}</div>
        <button onClick={() => navigate({ to: "/auth" })} className="text-xs text-white/60 hover:text-white">Skip</button>
      </div>

      <div className="relative mt-6 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(i + 1);
              else if (info.offset.x > 60) go(i - 1);
            }}
            initial={{ opacity: 0, x: dir * 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -dir * 60, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full cursor-grab flex-col items-center justify-center text-center active:cursor-grabbing"
          >
            <div className={`relative mb-10 flex h-60 w-60 items-center justify-center rounded-[2rem] bg-gradient-to-br ${s.tint} glass`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-[1.75rem] border border-dashed border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-3xl border border-white/10"
              />
              <motion.div
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
                className="relative flex h-24 w-24 items-center justify-center rounded-2xl gradient-ember ring-glow"
              >
                <Icon className="size-12 text-primary-foreground" />
                <span className="absolute inset-0 rounded-2xl pulse-ring" />
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="absolute -bottom-3 -right-3 h-12 w-12 rounded-2xl glass-strong"
              />
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="absolute -left-3 -top-3 h-8 w-8 rounded-xl glass-strong"
              />
            </div>
            <motion.h2
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="px-2 text-2xl font-semibold"
            >
              {s.title}
            </motion.h2>
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="mt-3 max-w-xs text-sm leading-relaxed text-white/65"
            >
              {s.desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mb-6 flex justify-center gap-1.5">
        {slides.map((_, k) => (
          <motion.button
            key={k}
            onClick={() => go(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 gradient-ember" : "w-1.5 bg-white/20"}`}
            whileTap={{ scale: 0.9 }}
            animate={{ width: k === i ? 32 : 6 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="relative h-14 w-full gradient-ember text-base font-semibold text-primary-foreground ring-glow hover:opacity-95"
        onClick={() => (last ? navigate({ to: "/auth" }) : go(i + 1))}
      >
        {last ? "Get Started" : "Next"}
        <ArrowRight className="ml-1 size-4" />
      </Button>
    </div>
  );
}
