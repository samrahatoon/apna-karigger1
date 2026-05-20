import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, Briefcase, Award, ShieldCheck } from "lucide-react";
import { providers } from "@/lib/mock";

export const Route = createFileRoute("/provider/$id")({ component: ProviderDetail });

function ProviderDetail() {
  const { id } = useParams({ from: "/provider/$id" });
  const navigate = useNavigate();
  const p = providers.find((x) => x.id === id) ?? providers[0];

  return (
    <div className="mx-auto min-h-dvh max-w-md pb-32">
      <div className="relative h-64 overflow-hidden rounded-b-[2rem]">
        <div className="absolute inset-0 gradient-ember opacity-90" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 50%)" }} />
        <button onClick={() => navigate({ to: "/providers" })} className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
          <ArrowLeft className="size-4" />
        </button>
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center text-center text-primary-foreground">
          <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={p.avatar} className="h-24 w-24 rounded-3xl bg-white/30 ring-4 ring-white/40" />
          <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
          <p className="text-xs opacity-80">{p.trade} · {p.area}</p>
        </div>
      </div>

      <div className="-mt-6 px-5">
        <div className="glass grid grid-cols-3 divide-x divide-white/5 rounded-2xl p-4 text-center">
          <Stat icon={Star} value={p.rating} label={`${p.reviews} reviews`} />
          <Stat icon={Briefcase} value={p.jobs} label="Jobs done" />
          <Stat icon={Award} value={`${p.experienceYears}y`} label="Experience" />
        </div>
      </div>

      <div className="mt-6 space-y-5 px-5">
        <Section title="About">
          <p className="text-sm leading-relaxed text-white/70">{p.bio}</p>
        </Section>

        <Section title="Trust & verification">
          <div className="flex flex-wrap gap-2">
            {["CNIC Verified", "Background Check", "Tools Insured", "On-time guarantee"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px]">
                <ShieldCheck className="size-3 text-emerald-400" /> {t}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Reviews">
          <div className="space-y-2">
            {[
              { n: "Ayesha", t: "Bohat acha kaam kiya, on-time aaya. Highly recommend!", r: 5 },
              { n: "Usman", t: "Professional and fairly priced.", r: 5 },
              { n: "Rabia", t: "AC ab perfect chal raha hai, shukriya.", r: 4 },
            ].map((r) => (
              <div key={r.n} className="glass rounded-2xl p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{r.n}</span>
                  <span className="flex items-center gap-0.5 text-[11px] text-primary">
                    {Array.from({ length: r.r }).map((_, k) => <Star key={k} className="size-3 fill-primary text-primary" />)}
                  </span>
                </div>
                <p className="text-xs text-white/70">{r.t}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Pricing">
          <div className="glass flex items-center justify-between rounded-2xl p-4">
            <div>
              <div className="text-xs text-white/50">Starting from</div>
              <div className="text-2xl font-semibold gradient-text">Rs {p.priceFrom.toLocaleString()}</div>
              <div className="text-[11px] text-white/50">Final price after diagnosis</div>
            </div>
            <MapPin className="size-8 text-white/30" />
          </div>
        </Section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md p-4">
        <div className="glass-strong flex items-center gap-2 rounded-2xl p-2 ring-glow">
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5"><Phone className="size-4" /></button>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5"><MessageCircle className="size-4" /></button>
          <button
            onClick={() => navigate({ to: "/workflow" })}
            className="flex h-12 flex-1 items-center justify-center rounded-xl gradient-ember text-sm font-semibold text-primary-foreground"
          >
            Book Now · Rs {p.priceFrom.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: any) {
  return (
    <div className="px-2">
      <Icon className="mx-auto mb-1 size-4 text-primary" />
      <div className="text-base font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="mb-2 text-[11px] font-medium uppercase tracking-widest text-white/40">{title}</h3>
      {children}
    </div>
  );
}
