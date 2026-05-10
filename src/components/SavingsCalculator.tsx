import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Counter from "./Counter";
import { Sparkles } from "lucide-react";

export default function SavingsCalculator() {
  const [tools, setTools] = useState(8);
  const [team, setTeam] = useState(15);
  const [spend, setSpend] = useState(2400);

  const savings = useMemo(() => {
    const wasteRate = Math.min(0.45, 0.08 + tools * 0.018 + team * 0.004);
    return Math.round(spend * wasteRate);
  }, [tools, team, spend]);

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8 shadow-card">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Slider label="AI tools in your stack" value={tools} min={1} max={30} onChange={setTools} suffix=" tools" />
          <Slider label="Team size" value={team} min={1} max={200} onChange={setTeam} suffix=" people" />
          <Slider label="Monthly AI spend" value={spend} min={200} max={20000} step={100} onChange={setSpend} prefix="$" />
        </div>

        <div className="relative rounded-xl bg-gradient-to-br from-[oklch(0.78_0.18_220/0.18)] to-[oklch(0.7_0.22_310/0.18)] p-6 flex flex-col justify-center items-center text-center border border-border/60">
          <div className="absolute inset-0 rounded-xl shadow-glow opacity-40 pointer-events-none" />
          <div className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Sparkles className="h-3 w-3 text-[oklch(0.78_0.18_220)]" /> Estimated savings
          </div>
          <motion.div
            key={savings}
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-gradient"
          >
            $<Counter to={savings} duration={700} />
          </motion.div>
          <p className="text-sm text-muted-foreground mt-1">per month, on average</p>

          <div className="mt-6 w-full grid grid-cols-3 gap-3 text-xs">
            <Stat label="Yearly" value={`$${(savings * 12).toLocaleString()}`} />
            <Stat label="3-year" value={`$${(savings * 36).toLocaleString()}`} />
            <Stat label="Waste" value={`${Math.round((savings / spend) * 100)}%`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label, value, min, max, step = 1, onChange, prefix = "", suffix = "",
}: { label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void; prefix?: string; suffix?: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm font-medium tabular-nums">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-white/5 accent-[oklch(0.78_0.18_220)] cursor-pointer"
        style={{
          background: `linear-gradient(90deg, oklch(0.78 0.18 220) 0%, oklch(0.7 0.22 310) ${((value - min) / (max - min)) * 100}%, oklch(1 0 0 / 0.08) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg glass p-3">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold tabular-nums mt-0.5">{value}</p>
    </div>
  );
}
