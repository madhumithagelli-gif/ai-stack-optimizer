import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter", price: "$0", period: "forever",
    desc: "For solo founders auditing their first stack.",
    features: ["Up to 5 connected tools", "Basic spend dashboard", "Manual invoice upload", "Email support"],
  },
  {
    name: "Growth", price: "$49", period: "/ month", featured: true,
    desc: "For startups serious about cutting AI waste.",
    features: ["Unlimited tools & teams", "Smart downgrade engine", "Forecasting & budget alerts", "Invoice scanner + benchmarks", "Slack & Linear integrations", "Priority support"],
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "SSO, custom integrations, and a dedicated CSM.",
    features: ["SSO + SCIM", "Custom data residency", "Dedicated success manager", "Procurement workflows", "SLA & DPA"],
  },
];

export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`relative rounded-2xl p-7 hover-lift ${p.featured ? "glass-strong" : "glass"}`}
        >
          {p.featured && (
            <>
              <div className="absolute -inset-px rounded-2xl bg-gradient-primary opacity-60 blur-md -z-10" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                <Sparkles className="h-3 w-3" /> Most popular
              </span>
            </>
          )}
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">{p.desc}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{p.price}</span>
            <span className="text-sm text-muted-foreground">{p.period}</span>
          </div>
          <button className={`mt-6 w-full rounded-full py-2.5 text-sm font-medium transition ${p.featured ? "btn-glow" : "glass hover:border-primary/40"}`}>
            {p.name === "Enterprise" ? "Talk to sales" : "Get started"}
          </button>
          <ul className="mt-6 space-y-3 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-[oklch(0.85_0.15_155)] shrink-0" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
