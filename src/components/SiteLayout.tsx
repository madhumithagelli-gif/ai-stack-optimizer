import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export function Section({
  eyebrow, title, subtitle, children, id,
}: { eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-3xl mb-12 md:mb-16">
        {eyebrow && (
          <span className="inline-flex items-center text-xs font-medium tracking-wider uppercase text-[oklch(0.85_0.12_220)] mb-4">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
