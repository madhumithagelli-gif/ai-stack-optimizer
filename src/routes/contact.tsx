import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/SiteLayout";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — StackWise" },
      { name: "description", content: "Talk to the StackWise team about cutting your AI spend, custom plans, and partnerships." },
      { property: "og:title", content: "Contact — StackWise" },
      { property: "og:description", content: "We respond in under 4 hours, every business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <Section eyebrow="Contact" title="Let's cut your AI bill" subtitle="Tell us about your stack. We'll reply within 4 hours with a tailored savings estimate.">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {[
              [Mail, "Email", "hello@stackwise.ai"],
              [MessageSquare, "Sales", "sales@stackwise.ai"],
              [MapPin, "HQ", "San Francisco, CA"],
            ].map(([Icon, k, v]) => {
              const I = Icon as React.ComponentType<{ className?: string }>;
              return (
                <div key={k as string} className="glass rounded-2xl p-5 flex items-center gap-4 hover-lift">
                  <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <I className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{k as string}</p>
                    <p className="text-sm font-medium">{v as string}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            className="lg:col-span-2 glass-strong rounded-2xl p-7 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" placeholder="Ada Lovelace" />
              <Field label="Work email" type="email" placeholder="ada@startup.com" />
            </div>
            <Field label="Company" placeholder="Acme AI" />
            <div>
              <label className="text-sm text-muted-foreground">Tell us about your stack</label>
              <textarea
                rows={5}
                className="mt-2 w-full glass rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="We use OpenAI, Anthropic, Notion AI..."
              />
            </div>
            <button className="btn-glow rounded-full px-5 py-3 text-sm font-medium">
              {sent ? "Thanks — we'll be in touch ✨" : "Send message"}
            </button>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input {...rest} className="mt-2 w-full glass rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
    </div>
  );
}
