import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/SiteLayout";
import DashboardMockup from "@/components/DashboardMockup";
import Counter from "@/components/Counter";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StackWise" },
      { name: "description", content: "A futuristic finance command center for AI spend — pie charts, recommendations, vendor breakdowns, and forecasts." },
      { property: "og:title", content: "Dashboard — StackWise" },
      { property: "og:description", content: "See every AI subscription, every wasted dollar, every recommendation." },
    ],
  }),
  component: DashboardPage,
});

function PieRing({ value, label, color }: { value: number; label: string; color: string }) {
  const c = 2 * Math.PI * 38;
  return (
    <div className="glass rounded-2xl p-6 hover-lift flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" />
        <motion.circle
          cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div>
        <p className="text-3xl font-semibold tabular-nums"><Counter to={value} suffix="%" /></p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <SiteLayout>
      <Section eyebrow="Dashboard" title="Your AI spend, finally in focus" subtitle="Live, beautiful and shareable. Everything finance and engineering need on one canvas.">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3"><DashboardMockup /></div>
          <div className="lg:col-span-2 space-y-4">
            <PieRing value={68} label="Tool utilization" color="oklch(0.78 0.18 220)" />
            <PieRing value={32} label="Spend optimized" color="oklch(0.7 0.22 310)" />
            <PieRing value={94} label="Forecast accuracy" color="oklch(0.78 0.18 155)" />
          </div>
        </div>
      </Section>

      <Section eyebrow="Realtime" title="Live recommendations engine">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Consolidate", "Merge Notion AI + Anthropic Workspaces", "$220 / mo"],
            ["Downgrade", "ChatGPT Team has 6 unused seats", "$180 / mo"],
            ["Switch", "Replace Midjourney with bundled credits", "$96 / mo"],
            ["Cancel", "Inactive Pinecone instance for 41 days", "$70 / mo"],
            ["Renegotiate", "Upcoming Cursor renewal — benchmark beats vendor", "$140 / mo"],
            ["Refund", "Detected double-charge on OpenAI invoice", "$310 once"],
          ].map(([tag, body, save], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <span className="text-[10px] uppercase tracking-wider text-[oklch(0.85_0.12_220)] font-medium">{tag}</span>
              <p className="mt-2 text-sm leading-relaxed">{body}</p>
              <p className="mt-4 text-sm font-semibold text-[oklch(0.85_0.15_155)]">Save {save}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
