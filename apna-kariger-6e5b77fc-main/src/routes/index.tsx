import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Brain, Search, BarChart3, CalendarCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({ component: Splash });

const agents = [
  { icon: Brain, deg: 0 },
  { icon: Search, deg: 90 },
  { icon: BarChart3, deg: 180 },
  { icon: CalendarCheck, deg: 270 },
];

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center overflow-hidden px-6">
      {/* cinematic gradient orbs */}
      <motion.div
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,122,26,0.45), transparent 60%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(80,90,255,0.4), transparent 60%)" }}
        animate={{ scale: [1.15, 1, 1.15] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* grid floor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at 50% 60%, black 30%, transparent 75%)",
        }}
      />

      {/* orbiting agent nodes around logo */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-56 w-56 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          {agents.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 180 }}
                className="absolute left-1/2 top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-2xl glass-strong ring-glow"
                style={{ transform: `rotate(${a.deg}deg) translateY(-7rem) rotate(-${a.deg}deg)` }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="size-4 text-primary" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        <Logo size={120} />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 text-4xl font-semibold tracking-tight"
      >
        Apna <span className="gradient-text">Kariger</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mt-2 text-sm text-white/60"
      >
        AI for Every Kariger
      </motion.p>

      {/* boot trace */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/45">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          Initializing AI agents
        </div>
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full gradient-ember"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
