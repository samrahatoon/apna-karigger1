import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/auth")({ component: Auth });

function Auth() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-10 pt-12">
      <div className="flex flex-col items-center">
        <Logo size={72} />
        <h1 className="mt-5 text-2xl font-semibold">
          {mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset password" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-white/60">
          {mode === "signup" ? "Join thousands trusting Apna Kariger" : mode === "forgot" ? "We'll send a reset link" : "Login to continue"}
        </p>
      </div>

      {mode !== "forgot" && (
        <div className="mt-6 flex rounded-full glass p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative flex-1 rounded-full py-2 text-sm font-medium capitalize transition ${
                mode === m ? "text-primary-foreground" : "text-white/60"
              }`}
            >
              {mode === m && <motion.div layoutId="auth-pill" className="absolute inset-0 -z-10 rounded-full gradient-ember" />}
              {m}
            </button>
          ))}
        </div>
      )}

      <motion.form
        key={mode}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 space-y-3"
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/home" }); }}
      >
        {mode === "signup" && (
          <Field icon={User} placeholder="Full name" />
        )}
        <Field icon={Mail} placeholder="Email or phone" type="email" />
        {mode !== "forgot" && <Field icon={Lock} placeholder="Password" type="password" />}

        {mode === "login" && (
          <div className="flex justify-end">
            <button type="button" onClick={() => setMode("forgot")} className="text-xs text-white/60 hover:text-white">
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="mt-2 h-12 w-full gradient-ember font-semibold text-primary-foreground ring-glow hover:opacity-95"
        >
          {mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Login"}
          <ArrowRight className="ml-1 size-4" />
        </Button>
      </motion.form>

      {mode !== "forgot" && (
        <>
          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/40">
            <div className="h-px flex-1 bg-white/10" /> or continue with <div className="h-px flex-1 bg-white/10" />
          </div>
          <button
            onClick={() => navigate({ to: "/home" })}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl glass text-sm font-medium hover:bg-white/5"
          >
            <GoogleIcon /> Continue with Google
          </button>
        </>
      )}

      {mode === "forgot" && (
        <button onClick={() => setMode("login")} className="mt-6 text-center text-xs text-white/60">
          ← Back to login
        </button>
      )}

      <p className="mt-8 text-center text-xs text-white/40">
        By continuing you agree to <Link to="/" className="text-white/70">Terms</Link> & <Link to="/" className="text-white/70">Privacy</Link>
      </p>
    </div>
  );
}

function Field({ icon: Icon, ...props }: any) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" />
      <Input
        {...props}
        className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-sm text-white placeholder:text-white/40 focus-visible:ring-primary"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.3 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.8 29.2 5 24 5 16.3 5 9.7 9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 38.9 16.2 43 24 43z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.1 5c4.3-4 6.6-9.9 6.6-16.3 0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
