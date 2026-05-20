import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Sparkles, MapPin, Clock, Wrench } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { quickPrompts, services } from "@/lib/mock";

export const Route = createFileRoute("/home")({ component: Home });

type Msg = { role: "user" | "ai"; text: string; intent?: { service: string; location: string; time: string } };

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Asalam-o-Alaikum! Main aapka AI assistant hoon. Bataiye, aaj kaunsa kariger chahiye?" },
  ]);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "Samajh gaya! Maine aapki request ko parse kiya hai. 3 verified Karigers mil gaye hain G-13 ke paas.",
          intent: { service: "AC Technician", location: "G-13, Islamabad", time: "Tomorrow, 10:00 AM" },
        },
      ]);
      setTimeout(() => navigate({ to: "/providers" }), 1400);
    }, 1600);
  };

  return (
    <MobileShell>
      <ScreenHeader
        title="Apna Kariger"
        subtitle="Ask in Urdu, Roman Urdu, or English"
        right={
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-ember ring-glow"
          >
            <Sparkles className="size-5 text-primary-foreground" />
            <span className="absolute inset-0 rounded-xl pulse-ring" />
          </motion.div>
        }
      />

      {/* service strip */}
      <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {services.map((s, idx) => (
          <motion.button
            key={s.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.4 }}
            whileTap={{ scale: 0.94 }}
            className="flex shrink-0 items-center gap-2 rounded-full glass px-3 py-2 text-xs hover:bg-white/10"
          >
            <span>{s.emoji}</span>{s.label}
          </motion.button>
        ))}
      </div>


      {/* messages */}
      <div className="flex flex-col gap-3 px-5 pt-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[82%] ${m.role === "user" ? "" : ""}`}>
                {m.role === "ai" && (
                  <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Kariger AI
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "gradient-ember text-primary-foreground"
                      : "glass text-white/90"
                  }`}
                >
                  {m.text}
                </div>
                {m.intent && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Chip icon={Wrench} label={m.intent.service} />
                    <Chip icon={MapPin} label={m.intent.location} />
                    <Chip icon={Clock} label={m.intent.time} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass flex items-center gap-1.5 rounded-2xl px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="mt-2 px-5">
          <div className="mb-2 text-[11px] uppercase tracking-widest text-white/40">Try saying</div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full glass px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* floating input */}
      <div className="fixed inset-x-0 bottom-24 z-30 mx-auto max-w-md px-4">
        <motion.form
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.15 }}
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="glass-strong relative flex items-center gap-2 overflow-hidden rounded-2xl px-3 py-2 ring-glow"
        >
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
          >
            <Mic className="size-4 text-white/80" />
            <motion.span
              className="absolute inset-0 rounded-xl border border-primary/40"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mujhe AC technician chahiye…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ember text-primary-foreground"
          >
            <Send className="size-4" />
          </motion.button>
        </motion.form>
      </div>

    </MobileShell>
  );
}

function Chip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl glass px-2.5 py-2 text-[11px]">
      <Icon className="size-3 text-primary" />
      <span className="truncate text-white/80">{label}</span>
    </div>
  );
}
