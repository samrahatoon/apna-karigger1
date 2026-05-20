import { motion } from "framer-motion";

export function Logo({ size = 96, orbit = false }: { size?: number; orbit?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* outer breathing halo */}
      <motion.div
        className="absolute inset-[-18%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,138,61,0.45), transparent 65%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {orbit && (
        <motion.div
          className="absolute inset-[-30%] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,138,61,0.9)]"
              style={{ transform: `rotate(${deg}deg) translateY(-2px)`, opacity: 0.8 - i * 0.12 }}
            />
          ))}
        </motion.div>
      )}
      <div className="absolute inset-0 rounded-3xl gradient-ember blur-2xl opacity-60" />
      <div className="relative flex h-full w-full items-center justify-center rounded-3xl gradient-ember ring-glow">
        <svg viewBox="0 0 64 64" className="h-3/5 w-3/5 text-primary-foreground">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            d="M14 46 L32 14 L50 46 M22 36 H42"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            cx="50" cy="14" r="5" fill="currentColor"
          />
        </svg>
      </div>
    </motion.div>
  );
}
