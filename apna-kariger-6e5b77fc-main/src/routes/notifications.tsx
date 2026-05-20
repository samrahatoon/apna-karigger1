import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck, Sparkles, BellRing, CheckCircle2 } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { notifications } from "@/lib/mock";

const iconFor = (k: string) =>
  k === "booking" ? CalendarCheck : k === "ai" ? Sparkles : k === "status" ? CheckCircle2 : BellRing;

export const Route = createFileRoute("/notifications")({ component: Notifications });

function Notifications() {
  return (
    <MobileShell>
      <ScreenHeader title="Notifications" subtitle="Updates from your AI agents" />
      <div className="mt-5 flex flex-col gap-3 px-5">
        {notifications.map((n, i) => {
          const Icon = iconFor(n.kind);
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass flex gap-3 rounded-2xl p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-ember">
                <Icon className="size-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-medium">{n.title}</h4>
                  <span className="shrink-0 text-[10px] text-white/40">{n.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-white/65">{n.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </MobileShell>
  );
}
