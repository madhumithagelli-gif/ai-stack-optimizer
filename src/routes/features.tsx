import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/SiteLayout";
import FeatureGrid from "@/components/FeatureGrid";
import SavingsCalculator from "@/components/SavingsCalculator";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — StackWise" },
      { name: "description", content: "Discover every capability of StackWise — duplicate detection, downgrade engine, forecasting, invoice scanning, and more." },
      { property: "og:title", content: "Features — StackWise" },
      { property: "og:description", content: "Everything you need to tame AI spend in one cost intelligence platform." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Section eyebrow="Features" title="A complete cost intelligence platform" subtitle="Built from the ground up for the messy, fast-moving reality of modern AI stacks.">
        <FeatureGrid />
      </Section>
      <Section eyebrow="Try it" title="Estimate your savings now">
        <SavingsCalculator />
      </Section>
    </SiteLayout>
  ),
});
