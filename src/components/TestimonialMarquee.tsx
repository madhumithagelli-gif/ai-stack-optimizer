import { motion } from "framer-motion";

const items = [
  { quote: "StackWise paid for itself in the first week. We cut $4,800/mo across redundant AI subscriptions we didn't even know we had.", name: "Maya Chen", role: "CFO, Vector Labs" },
  { quote: "It's the dashboard I always wished finance would build. Engineering loves it, finance loves it more.", name: "Daniel Park", role: "CTO, Northwind AI" },
  { quote: "Our AI bill went from chaotic to predictable in 48 hours. The forecasting alone is worth the price.", name: "Priya Raman", role: "Head of Ops, Lumen" },
  { quote: "We caught a $1,200/mo duplicate subscription on day one. Sold.", name: "Jordan Ellis", role: "Founder, Rivet" },
  { quote: "Finally a tool that talks to founders, not just enterprise procurement.", name: "Sofia Ortega", role: "COO, Helix" },
  { quote: "The invoice scanner is sorcery. We got back $9k in vendor refunds last quarter.", name: "Wei Zhang", role: "VP Finance, Driftly" },
];

export default function TestimonialMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div className="flex gap-5 w-max animate-marquee">
        {row.map((t, i) => (
          <div key={i} className="glass rounded-2xl p-6 w-[340px] shrink-0 hover-lift">
            <p className="text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-primary shadow-glow grid place-items-center text-xs font-semibold text-primary-foreground">
                {t.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="text-xs">
                <p className="font-medium">{t.name}</p>
                <p className="text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
