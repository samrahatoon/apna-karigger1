import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { providers } from "@/lib/mock";

export const Route = createFileRoute("/providers")({ component: Providers });

function Providers() {
  const navigate = useNavigate();
  return (
    <MobileShell>
      <ScreenHeader
        title="Top Karigers nearby"
        subtitle="Ranked by AI: trust × distance × availability"
      />
      <div className="mt-5 flex flex-col gap-3 px-5">
        {providers.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => navigate({ to: "/provider/$id", params: { id: p.id } })}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass relative w-full overflow-hidden rounded-2xl p-4 text-left"
          >
            {i === 0 && (
              <div className="absolute right-4 top-4 rounded-full gradient-ember px-2 py-1 text-[10px] font-semibold text-primary-foreground">
                AI Pick
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={p.avatar} className="h-14 w-14 rounded-2xl bg-white/10 object-cover" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#10142a]">
                  <ShieldCheck className="size-3 text-white" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">{p.name}</h3>
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/60">{p.badge}</span>
                </div>
                <p className="text-xs text-white/60">{p.trade} · {p.area}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-white/70">
                  <span className="flex items-center gap-1"><Star className="size-3 fill-primary text-primary" />{p.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="size-3" />{p.distanceKm}km</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" />{p.etaMin}m</span>
                </div>
              </div>
              <ChevronRight className="size-4 text-white/40" />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
              <div className="text-[11px] text-white/50">From <span className="text-base font-semibold text-white">Rs {p.priceFrom.toLocaleString()}</span></div>
              <span className="rounded-xl gradient-ember px-3 py-1.5 text-xs font-semibold text-primary-foreground">Book Now</span>
            </div>
          </motion.button>
        ))}
      </div>
    </MobileShell>
  );
}
