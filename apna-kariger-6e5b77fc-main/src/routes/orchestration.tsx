import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Brain,
  Search,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Cpu,
  Zap,
  Filter,
} from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { runs, stats, type AgentKey, type LogLevel, type WorkflowRun } from "@/lib/orchestration";

export const Route = createFileRoute("/orchestration")({ component: Orchestration });

const agentMeta: Record<AgentKey, { icon: any; tone: string }> = {
  System: { icon: Cpu, tone: "text-white/70" },
  IntentAgent: { icon: Brain, tone: "text-violet-300" },
  DiscoveryAgent: { icon: Search, tone: "text-sky-300" },
  RankingAgent: { icon: BarChart3, tone: "text-amber-300" },
  BookingAgent: { icon: CalendarCheck, tone: "text-emerald-300" },
};

const levelDot: Record<LogLevel, string> = {
  info: "bg-white/40",
  success: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]",
  warn: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]",
  error: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]",
};

function Orchestration() {
  const [filter, setFilter] = useState<"all" | "success" | "failure">("all");
  const [openId, setOpenId] = useState<string | null>(runs[0].id);

  const filtered = useMemo(
    () => (filter === "all" ? runs : runs.filter((r) => r.status === filter)),
    [filter],
  );

  return (
    <MobileShell>
      <ScreenHeader
        title="Orchestration"
        subtitle="Antigravity multi-agent runtime · live trace"
        right={
          <Link to="/workflow" className="glass rounded-xl px-3 py-2 text-[11px] text-white/80">
            New run →
          </Link>
        }
      />

      {/* powered banner */}
      <div className="mx-5 mt-4 flex items-center gap-2 rounded-2xl glass px-3 py-2 ring-glow">
        <div className="relative flex h-7 w-7 items-center justify-center rounded-lg gradient-ember">
          <Zap className="size-3.5 text-primary-foreground" />
          <span className="absolute inset-0 rounded-lg pulse-ring" />
        </div>
        <div className="text-[11px] leading-tight">
          <div className="font-semibold">Powered by Antigravity AI</div>
          <div className="text-white/55">5 autonomous agents orchestrating bookings in real time</div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mx-5 mt-4 grid grid-cols-4 gap-2">
        <Kpi label="Runs" value={stats.total} icon={Activity} />
        <Kpi label="Success" value={stats.success} tone="text-emerald-300" />
        <Kpi label="Failed" value={stats.failed} tone="text-rose-300" />
        <Kpi label="Agents" value={stats.agents} tone="text-amber-300" />
      </div>

      {/* Agent pipeline */}
      <div className="mx-5 mt-5">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40">Pipeline</div>
        <div className="glass relative flex items-center justify-between overflow-hidden rounded-2xl p-3">
          <div className="absolute inset-y-0 left-5 right-5 top-1/2 -z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {(["IntentAgent", "DiscoveryAgent", "RankingAgent", "BookingAgent"] as AgentKey[]).map((k, i) => {
            const Icon = agentMeta[k].icon;
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl glass-strong">
                  <Icon className={`size-4 ${agentMeta[k].tone}`} />
                </div>
                <div className="text-[9px] text-white/60">{k.replace("Agent", "")}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="mx-5 mt-5 flex items-center gap-2">
        <Filter className="size-3.5 text-white/40" />
        {(["all", "success", "failure"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-[11px] capitalize transition ${
              filter === f ? "gradient-ember text-primary-foreground" : "glass text-white/70"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Runs */}
      <div className="mx-5 mt-3 flex flex-col gap-3">
        {filtered.map((run) => (
          <RunCard key={run.id} run={run} open={openId === run.id} onToggle={() => setOpenId(openId === run.id ? null : run.id)} />
        ))}
      </div>
    </MobileShell>
  );
}

function Kpi({ label, value, tone = "gradient-text", icon: Icon }: { label: string; value: number; tone?: string; icon?: any }) {
  return (
    <div className="glass rounded-2xl px-2 py-3 text-center">
      <div className="flex items-center justify-center gap-1">
        {Icon && <Icon className="size-3 text-white/50" />}
        <div className="text-[9px] uppercase tracking-widest text-white/50">{label}</div>
      </div>
      <div className={`mt-0.5 text-lg font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function RunCard({ run, open, onToggle }: { run: WorkflowRun; open: boolean; onToggle: () => void }) {
  const okay = run.status === "success";
  return (
    <motion.div layout className={`glass overflow-hidden rounded-2xl ${open ? "ring-glow" : ""}`}>
      <button onClick={onToggle} className="flex w-full items-start gap-3 p-3 text-left">
        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${okay ? "gradient-ember" : "bg-rose-500/20 ring-1 ring-rose-500/50"}`}>
          {okay ? <CheckCircle2 className="size-4 text-primary-foreground" /> : <XCircle className="size-4 text-rose-300" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/50">{run.id}</span>
            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60">{run.language}</span>
            <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] ${okay ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
              {okay ? "SUCCESS" : "FAILED"}
            </span>
          </div>
          <div className="mt-1 truncate text-sm text-white/90" dir="auto">{run.query}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/55">
            <span>🔧 {run.intent}</span>
            <span>📍 {run.location}</span>
            <span>⏱ {run.time}</span>
            {run.bookingId && <span className="text-emerald-300">#{run.bookingId}</span>}
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }} className="mt-1 text-white/50">
          <ChevronRight className="size-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 bg-black/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Execution timeline</div>
                <div className="font-mono text-[10px] text-white/40">{run.startedAt}</div>
              </div>
              <ol className="relative pl-4">
                <span className="absolute bottom-1 left-[5px] top-1 w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent" />
                {run.trace.map((t, idx) => {
                  const meta = agentMeta[t.agent];
                  const Icon = meta.icon;
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="relative mb-2 last:mb-0"
                    >
                      <span className={`absolute -left-[14px] top-1.5 h-2.5 w-2.5 rounded-full ${levelDot[t.level]}`} />
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[9px] text-white/35">{t.t}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${meta.tone}`}>
                          <Icon className="size-3" />
                          {t.agent}
                        </span>
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] leading-snug text-white/80" dir="auto">
                        {t.msg}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>

              {run.provider && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-400/10 px-3 py-2 ring-1 ring-emerald-400/30">
                  <div className="text-[11px]">
                    <div className="font-semibold text-emerald-200">{run.provider}</div>
                    <div className="text-emerald-200/70">★ {run.rating} · booking #{run.bookingId}</div>
                  </div>
                  <CheckCircle2 className="size-4 text-emerald-300" />
                </div>
              )}
              {!okay && run.failureReason && (
                <div className="mt-3 rounded-xl bg-rose-500/10 px-3 py-2 text-[11px] text-rose-200 ring-1 ring-rose-500/30">
                  {run.failureReason}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
