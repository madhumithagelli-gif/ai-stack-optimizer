import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import SiteLayout, { Section } from "@/components/SiteLayout";
import DashboardMockup from "@/components/DashboardMockup";
import FeatureGrid from "@/components/FeatureGrid";
import SavingsCalculator from "@/components/SavingsCalculator";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import PricingCards from "@/components/PricingCards";
import Counter from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StackWise — Stop Overpaying for AI Tools" },
      { name: "description", content: "AI-powered cost optimizer for startups. Detect duplicate subscriptions, right-size plans, and save hundreds every month." },
      { property: "og:title", content: "StackWise — AI Cost Optimizer for Startups" },
      { property: "og:description", content: "Analyze your AI subscriptions, detect waste, and save hundreds every month." },
    ],
  }),
  component: Home,
});

const logos = ["NORTHWIND", "VECTOR", "RIVET", "LUMEN", "DRIFTLY", "HELIX"];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[oklch(0.78_0.18_220/0.25)] blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[oklch(0.7_0.22_310/0.25)] blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full glass mb-6"
            >
              <Sparkles className="h-3 w-3 text-[oklch(0.85_0.12_220)]" />
              <span className="text-muted-foreground">New — Anthropic & Cursor benchmarks live</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Stop <span className="text-gradient">Overpaying</span>
              <br /> for AI Tools
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Analyze your AI subscriptions, detect waste, and save hundreds every month with AI-powered recommendations built for fast-moving teams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/dashboard" className="btn-glow inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium animate-pulse-glow">
                Analyze My Stack <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="glass hover-lift inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium">
                <Play className="h-4 w-4" /> Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-6 max-w-md"
            >
              <Stat n={<Counter to={2400000} prefix="$" />} l="Saved for customers" />
              <Stat n={<Counter to={1800} suffix="+" />} l="AI tools tracked" />
              <Stat n={<Counter to={32} suffix="%" />} l="Avg. spend cut" />
            </motion.div>
          </div>

          <div className="relative lg:pl-6">
            <DashboardMockup />
          </div>
        </div>

        {/* Logo bar */}
        <div className="relative border-y border-border/60 py-8">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs tracking-[0.3em] text-muted-foreground">
            <span className="text-[10px]">TRUSTED BY 2,400+ STARTUPS</span>
            {logos.map((l) => <span key={l} className="opacity-60 hover:opacity-100 transition">{l}</span>)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Section eyebrow="Features" title="Everything you need to tame AI spend" subtitle="A complete cost intelligence platform purpose-built for the AI era — no spreadsheets required.">
        <FeatureGrid />
      </Section>

      {/* CALCULATOR */}
      <Section eyebrow="Calculator" title="See your savings in 10 seconds" subtitle="Drag the sliders. Watch the numbers move. No signup, no credit card.">
        <SavingsCalculator />
      </Section>

      {/* DASHBOARD PREVIEW */}
      <Section eyebrow="Dashboard" title="A finance command center for AI" subtitle="Pie charts, recommendations, vendor breakdowns and forecasts — all in one futuristic workspace.">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3"><DashboardMockup /></div>
          <ul className="lg:col-span-2 space-y-4">
            {[
              ["Active subscriptions", "47"], ["Wasted spend / mo", "$1,284"],
              ["AI recommendations", "12 active"], ["Forecast accuracy", "96.4%"],
            ].map(([k, v]) => (
              <li key={k} className="glass rounded-xl p-5 flex items-center justify-between hover-lift">
                <span className="text-sm text-muted-foreground">{k}</span>
                <span className="text-xl font-semibold tabular-nums">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Testimonials" title="Loved by founders & finance teams">
        <TestimonialMarquee />
      </Section>

      {/* PRICING */}
      <Section eyebrow="Pricing" title="Simple, usage-based pricing" subtitle="Start free. Upgrade when your savings outpace the bill — usually within a week.">
        <PricingCards />
      </Section>

      {/* FINAL CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-12 md:p-20 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_50%_50%,oklch(0.78_0.18_220/0.25),transparent_70%)]" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Start <span className="text-gradient">Saving on AI Tools</span> Today
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Connect your stack in minutes. See your first savings recommendation today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/dashboard" className="btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium animate-pulse-glow">
              Analyze My Stack <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-semibold tracking-tight">{n}</p>
      <p className="text-xs text-muted-foreground mt-1">{l}</p>
    </div>
  );
}
