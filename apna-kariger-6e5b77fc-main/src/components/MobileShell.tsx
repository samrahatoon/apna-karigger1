import { Link, useLocation } from "@tanstack/react-router";
import { Home, Bell, User, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

const tabs = [
  { to: "/home", icon: Home, label: "Chat" },
  { to: "/orchestration", icon: Activity, label: "AI Flow" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const { pathname } = useLocation();
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-md flex-col">
      {/* ambient bg shimmer */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,122,26,0.18), transparent 60%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 right-[-10%] h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 60%)" }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pb-28"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md justify-center px-4 pb-4">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 24 }}
            className="glass-strong relative flex w-full items-center justify-around overflow-hidden rounded-2xl px-2 py-2 ring-glow"
          >
            {/* top hairline highlight */}
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {tabs.map((t) => {
              const active = pathname === t.to || (t.to === "/home" && pathname === "/");
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className="relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium"
                >
                  {active && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-10 rounded-xl gradient-ember opacity-95"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="tab-glow"
                      className="absolute inset-x-3 -bottom-1 h-1 rounded-full bg-primary blur-md"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <motion.div
                    animate={active ? { y: -1, scale: 1.05 } : { y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    <Icon className={`size-5 ${active ? "text-primary-foreground" : "text-white/65"}`} />
                  </motion.div>
                  <span className={active ? "text-primary-foreground" : "text-white/65"}>{t.label}</span>
                </Link>
              );
            })}
          </motion.div>
        </nav>
      )}
    </div>
  );
}

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between px-5 pt-6"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
      </div>
      {right}
    </motion.div>
  );
}
