import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/SiteLayout";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import Counter from "@/components/Counter";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Customers — StackWise" },
      { name: "description", content: "What founders, CFOs, and ops leaders say about cutting AI waste with StackWise." },
      { property: "og:title", content: "Customers — StackWise" },
      { property: "og:description", content: "Real savings, real teams. Loved by founders and finance." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Customers" title="Loved by founders & finance teams" subtitle="From pre-seed to Series C, teams trust StackWise to keep AI spend honest.">
        <TestimonialMarquee />
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {[
            ["$2.4M+", "Saved across customers"],
            ["96%", "Customer satisfaction"],
            ["7 days", "Avg. payback period"],
          ].map(([n, l]) => (
            <div key={l} className="glass rounded-2xl p-8 text-center hover-lift">
              <p className="text-4xl font-bold tracking-tight text-gradient">{n}</p>
              <p className="text-sm text-muted-foreground mt-2">{l}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Numbers" title="By the numbers">
        <div className="grid sm:grid-cols-4 gap-5">
          {[
            [<><Counter to={2400} suffix="+" /></>, "Startups"],
            [<>$<Counter to={2400000} /></>, "Saved"],
            [<><Counter to={1800} suffix="+" /></>, "Tools tracked"],
            [<><Counter to={32} suffix="%" /></>, "Avg. cut"],
          ].map(([n, l], i) => (
            <div key={i} className="glass rounded-2xl p-6 hover-lift">
              <p className="text-3xl font-semibold tracking-tight">{n}</p>
              <p className="text-xs text-muted-foreground mt-1">{l}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  ),
});
