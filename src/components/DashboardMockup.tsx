import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Sparkles, Activity, DollarSign } from "lucide-react";
import Counter from "./Counter";

const tools = [
  { name: "OpenAI", spend: 1240, color: "oklch(0.78 0.18 220)" },
  { name: "Anthropic", spend: 890, color: "oklch(0.7 0.22 310)" },
  { name: "Notion AI", spend: 320, color: "oklch(0.78 0.18 155)" },
  { name: "Midjourney", spend: 240, color: "oklch(0.8 0.18 80)" },
  { name: "Linear", spend: 180, color: "oklch(0.7 0.18 30)" },
];
const total = tools.reduce((s, t) => s + t.spend, 0);

export default function DashboardMockup() {
  return (
    <div className="relative">
      {/* main panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-strong rounded-2xl p-5 md:p-6 shadow-card"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-muted-foreground">Monthly AI Spend</p>
            <p className="text-2xl font-semibold tracking-tight">
              $<Counter to={total} />
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-success/15 text-[oklch(0.85_0.15_155)] border border-[oklch(0.78_0.18_155)/0.3]">
            <TrendingDown className="h-3 w-3" /> -23% vs last month
          </span>
        </div>

        {/* Bars */}
        <div className="space-y-3">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="grid grid-cols-[88px_1fr_64px] items-center gap-3 text-xs"
            >
              <span className="text-muted-foreground">{t.name}</span>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(t.spend / tools[0].spend) * 100}%` }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${t.color}, oklch(0.7 0.22 310))` }}
                />
              </div>
              <span className="text-right tabular-nums">${t.spend}</span>
            </motion.div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="mt-6 pt-5 border-t border-border/60">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" /> Spend trend
            </p>
            <p className="text-xs text-muted-foreground">Last 12 weeks</p>
          </div>
          <svg viewBox="0 0 300 80" className="w-full h-20">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.18 220)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.78 0.18 220)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.8 }}
              d="M0,55 C30,40 50,60 75,45 C100,30 120,50 150,38 C180,25 210,40 240,28 C265,18 285,30 300,22"
              fill="none"
              stroke="oklch(0.78 0.18 220)"
              strokeWidth="2"
            />
            <path
              d="M0,55 C30,40 50,60 75,45 C100,30 120,50 150,38 C180,25 210,40 240,28 C265,18 285,30 300,22 L300,80 L0,80 Z"
              fill="url(#g1)"
            />
          </svg>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -left-6 -bottom-6 hidden sm:block animate-float"
      >
        <div className="glass-strong rounded-xl p-4 w-56 shadow-card">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Sparkles className="h-3 w-3 text-[oklch(0.78_0.18_220)]" /> AI Recommendation
          </div>
          <p className="text-sm font-medium leading-snug">
            Downgrade <span className="text-gradient">Notion AI</span> — 4 unused seats detected.
          </p>
          <p className="text-xs text-[oklch(0.85_0.15_155)] mt-1">Save $96 / mo</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -right-4 -top-6 hidden sm:block animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="glass-strong rounded-xl p-4 w-52 shadow-card">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <DollarSign className="h-3 w-3" /> Saved this month
          </div>
          <p className="text-2xl font-semibold tabular-nums">
            $<Counter to={847} />
          </p>
          <p className="text-xs text-[oklch(0.85_0.15_155)] flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" /> +18.2%
          </p>
        </div>
      </motion.div>
    </div>
  );
}
