import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Calendar, MapPin, User, BellRing } from "lucide-react";
import { providers } from "@/lib/mock";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/success")({ component: Success });

function Success() {
  const navigate = useNavigate();
  const p = providers[0];
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-10 pt-16">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full gradient-ember ring-glow"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ background: "rgba(255,122,26,0.6)" }}
          />
          <Check className="size-12 text-primary-foreground" strokeWidth={3} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 text-2xl font-semibold">
          Booking confirmed
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-1 text-sm text-white/60">
          Your Kariger is on the way. A reminder has been scheduled.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 glass rounded-3xl p-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Booking ID</div>
            <div className="font-mono text-base font-semibold gradient-text">#AK-1042</div>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Confirmed</span>
        </div>

        <Row icon={User} title="Assigned Kariger" value={`${p.name} · ${p.trade}`} />
        <Row icon={Calendar} title="Scheduled" value="Tomorrow, 10:00 AM" />
        <Row icon={MapPin} title="Location" value="G-13/3, Islamabad" />
        <Row icon={BellRing} title="Reminder" value="1 hour before · Push + SMS" last />
      </motion.div>

      <div className="mt-auto space-y-2">
        <Button onClick={() => navigate({ to: "/notifications" })} className="h-12 w-full gradient-ember font-semibold text-primary-foreground ring-glow">
          View notifications
        </Button>
        <Button variant="ghost" onClick={() => navigate({ to: "/home" })} className="h-12 w-full text-white/70 hover:bg-white/5">
          Back to chat
        </Button>
      </div>
    </div>
  );
}

function Row({ icon: Icon, title, value, last }: any) {
  return (
    <div className={`flex items-center gap-3 py-3 ${last ? "" : "border-b border-white/5"}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-white/40">{title}</div>
        <div className="truncate text-sm">{value}</div>
      </div>
    </div>
  );
}
