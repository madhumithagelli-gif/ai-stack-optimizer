import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/SiteLayout";
import PricingCards from "@/components/PricingCards";

const faqs = [
  ["Is there a free plan?", "Yes — Starter is free forever for up to 5 connected tools."],
  ["How fast do we see ROI?", "Most teams hit positive ROI within their first week of connecting their stack."],
  ["Do you support SSO?", "SAML SSO and SCIM provisioning are included on the Enterprise plan."],
  ["Can we cancel anytime?", "Yes. Monthly plans cancel anytime with no penalty."],
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — StackWise" },
      { name: "description", content: "Simple, usage-based pricing. Start free and upgrade once your savings outpace the bill." },
      { property: "og:title", content: "Pricing — StackWise" },
      { property: "og:description", content: "Three plans for every stage of startup. Free forever to start." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Pricing" title="Pricing that pays for itself" subtitle="Three plans, zero surprises. Most customers save 10x their subscription.">
        <PricingCards />
      </Section>
      <Section eyebrow="FAQ" title="Frequently asked questions">
        <div className="grid md:grid-cols-2 gap-5">
          {faqs.map(([q, a]) => (
            <div key={q} className="glass rounded-2xl p-6 hover-lift">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  ),
});
