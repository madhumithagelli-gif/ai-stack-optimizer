import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-lg font-semibold">StackWise</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            AI-powered cost optimization for the modern startup stack.
          </p>
          <div className="flex gap-3 pt-2">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-lg glass hover-lift">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/testimonials" className="hover:text-foreground">Customers</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Stay in the loop</h4>
          <p className="text-sm text-muted-foreground mb-3">Monthly insights on AI spend.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@startup.com"
              className="flex-1 min-w-0 rounded-lg glass px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <button className="btn-glow rounded-lg px-3 py-2 text-sm font-medium">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} StackWise, Inc. All rights reserved.</p>
          <p>Built for startups that ship.</p>
        </div>
      </div>
    </footer>
  );
}
