import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, BarChart3, CalendarCheck, BellRing, CheckCircle2 } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/workflow")({ component: Workflow });

const agents = [
  { key: "intent", name: "Intent Agent", icon: Brain, log: "Parsed → service: AC Technician · area: G-13 · time: tomorrow 10:00" },
  { key: "match", name: "Matching Agent", icon: Search, log: "Found 12 candidates within 5km · filtered to 5 verified" },
  { key: "rank", name: "Ranking Agent", icon: BarChart3, log: "Scored by trust(0.4) · distance(0.3) · availability(0.3) → top 3" },
  { key: "book", name: "Booking Agent", icon: CalendarCheck, log: "Reserved slot · provider notified · ID #AK-1042 generated" },
  { key: "follow", name: "Follow-up Agent", icon: BellRing, log: "Reminder scheduled @ 09:00 · post-job feedback queued" },
];

function Workflow() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const done = step >= agents.length;

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => navigate({ to: "/success" }), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1000);
    return () => clearTimeout(t);
  }, [step, done, navigate]);

  return (
    <MobileShell>
      <ScreenHeader title="AI Orchestration" subtitle="Live trace of multi-agent workflow" />

      <div className="mt-6 px-5">
        <div className="glass relative overflow-hidden rounded-2xl p-4">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full gradient-ember opacity-20 blur-3xl" />
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl gradient-ember pulse-ring">
              <Brain className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">Workflow #AK-1042</div>
              <div className="text-[11px] text-white/60">{done ? "Completed" : `Running step ${step + 1} of ${agents.length}`}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Progress</div>
              <div className="text-base font-semibold gradient-text">{Math.round((Math.min(step, agents.length) / agents.length) * 100)}%</div>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full gradient-ember"
              initial={{ width: 0 }}
              animate={{ width: `${(Math.min(step, agents.length) / agents.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* timeline */}
      <div className="relative mt-6 px-5">
        <div className="absolute bottom-0 left-9 top-0 w-px bg-white/10" />
        <div className="flex flex-col gap-3">
          {agents.map((a, i) => {
            const active = i === step;
            const complete = i < step;
            const Icon = a.icon;
            return (
              <motion.div
                key={a.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-3"
              >
                <div className="relative z-10">
                  <motion.div
                    animate={active ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      complete ? "gradient-ember" : active ? "bg-primary/30 ring-2 ring-primary" : "glass"
                    }`}
                  >
                    {complete ? (
                      <CheckCircle2 className="size-5 text-primary-foreground" />
                    ) : (
                      <Icon className={`size-5 ${active ? "text-primary" : "text-white/60"}`} />
                    )}
                  </motion.div>
                </div>
                <div className={`flex-1 rounded-2xl p-3 ${active ? "glass-strong ring-glow" : "glass"}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{a.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      {complete ? "✓ done" : active ? "running…" : "queued"}
                    </div>
                  </div>
                  <AnimatePresence>
                    {(active || complete) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 overflow-hidden rounded-lg bg-black/30 p-2 font-mono text-[10px] leading-relaxed text-emerald-300/80"
                      >
                        <span className="text-white/40">[trace] </span>{a.log}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}
