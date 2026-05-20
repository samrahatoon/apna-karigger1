import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Settings, Heart, ChevronRight, LogOut, Globe, Bell, ShieldCheck } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { bookingHistory, providers } from "@/lib/mock";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const navigate = useNavigate();
  return (
    <MobileShell>
      <ScreenHeader title="Profile" subtitle="Your account & activity" right={
        <button className="flex h-10 w-10 items-center justify-center rounded-xl glass"><Settings className="size-4" /></button>
      } />

      {/* User card */}
      <div className="mt-5 px-5">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-strong relative overflow-hidden rounded-3xl p-5 ring-glow">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full gradient-ember opacity-30 blur-3xl" />
          <div className="flex items-center gap-3">
            <img src="https://api.dicebear.com/9.x/notionists/svg?seed=You" className="h-14 w-14 rounded-2xl bg-white/10" />
            <div className="flex-1">
              <div className="text-base font-semibold">Ali Hassan</div>
              <div className="text-[11px] text-white/60">+92 300 1234567 · G-13, Islamabad</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                <ShieldCheck className="size-3" /> Verified user
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bookings */}
      <Section title="Booking history">
        <div className="space-y-2 px-5">
          {bookingHistory.map((b) => (
            <div key={b.id} className="glass flex items-center justify-between rounded-2xl p-3">
              <div>
                <div className="text-sm font-medium">{b.trade}</div>
                <div className="text-[11px] text-white/60">{b.name} · {b.date}</div>
              </div>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                b.status === "Upcoming" ? "bg-primary/20 text-primary" : "bg-white/5 text-white/60"
              }`}>{b.status}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Saved */}
      <Section title="Saved Karigers" icon={Heart}>
        <div className="flex gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {providers.slice(0, 4).map((p) => (
            <div key={p.id} className="glass w-32 shrink-0 rounded-2xl p-3 text-center">
              <img src={p.avatar} className="mx-auto h-14 w-14 rounded-xl bg-white/10" />
              <div className="mt-2 truncate text-xs font-medium">{p.name}</div>
              <div className="truncate text-[10px] text-white/50">{p.trade}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Settings */}
      <Section title="Settings">
        <div className="space-y-1.5 px-5">
          <Row icon={Globe} label="Language" value="English / اردو" />
          <Row icon={Bell} label="Notifications" value="On" />
          <Row icon={ShieldCheck} label="Privacy & security" value="" />
          <button
            onClick={() => navigate({ to: "/auth" })}
            className="glass mt-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left text-rose-300"
          >
            <LogOut className="size-4" /> <span className="text-sm">Log out</span>
          </button>
        </div>
      </Section>
    </MobileShell>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center gap-2 px-5 text-[11px] font-medium uppercase tracking-widest text-white/40">
        {Icon && <Icon className="size-3" />} {title}
      </div>
      {children}
    </div>
  );
}

function Row({ icon: Icon, label, value }: any) {
  return (
    <button className="glass flex w-full items-center gap-3 rounded-2xl p-3 text-left">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="flex-1 text-sm">{label}</div>
      <span className="text-[11px] text-white/50">{value}</span>
      <ChevronRight className="size-4 text-white/40" />
    </button>
  );
}
