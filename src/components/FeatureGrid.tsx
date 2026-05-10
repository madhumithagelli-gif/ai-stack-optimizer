import { motion } from "framer-motion";
import {
  BarChart3, Layers, Repeat2, ArrowDownCircle, Users, LineChart, PiggyBank, Receipt, Lightbulb,
} from "lucide-react";

const features = [
  { icon: Layers, title: "AI Stack Analysis", desc: "Auto-discover every AI tool across your org and map spend by team, owner, and use case." },
  { icon: Repeat2, title: "Duplicate Tool Detection", desc: "Spot overlapping subscriptions instantly — no more paying twice for the same capability." },
  { icon: ArrowDownCircle, title: "Smart Downgrade Suggestions", desc: "Right-size every plan based on actual usage patterns, not vendor sales pitches." },
  { icon: Users, title: "Team Usage Insights", desc: "See who actually uses what. Reclaim seats from inactive users automatically." },
  { icon: LineChart, title: "AI Cost Forecasting", desc: "Predict next quarter's spend with model-aware forecasts and budget alerts." },
  { icon: PiggyBank, title: "Savings Dashboard", desc: "Track realized savings in real time. Share wins with your finance team." },
  { icon: Receipt, title: "Invoice Scanner", desc: "Drop in a PDF — we extract line items, detect overcharges, and surface refund opportunities." },
  { icon: Lightbulb, title: "Alternative Recommendations", desc: "Get matched with cheaper, equivalent tools curated for your exact workflows." },
  { icon: BarChart3, title: "Vendor Benchmarking", desc: "Compare your pricing against thousands of startups in our anonymized dataset." },
];

export default function FeatureGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="glass rounded-2xl p-6 hover-lift group relative overflow-hidden"
        >
          <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
               style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,50%), oklch(0.78 0.18 220 / 0.18), transparent 60%)" }} />
          <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-4">
            <f.icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1.5">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
