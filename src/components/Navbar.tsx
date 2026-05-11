import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [8, 18]);
  const bg = useTransform(scrollY, [0, 120], ["oklch(0.13 0.025 270 / 0.3)", "oklch(0.13 0.025 270 / 0.7)"]);
  const initials = (user?.name || user?.email || "?")
    .split(/\s+/).map(s => s[0]).slice(0,2).join("").toUpperCase();

  return (
    <motion.header
      style={{ backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined, backgroundColor: bg as unknown as string }}
      className="fixed top-0 inset-x-0 z-50 border-b border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-lg font-semibold tracking-tight">StackWise</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={() => setMenu(m => !m)} className="flex items-center gap-2 rounded-full border border-border/60 bg-white/5 hover:bg-white/10 transition-colors px-2 py-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">{initials}</span>
                <span className="text-sm pr-2 max-w-[120px] truncate">{user.name}</span>
              </button>
              {menu && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 glass-strong rounded-xl border border-border/60 p-2 shadow-glow">
                  <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user.email}</div>
                  <Link to="/dashboard" onClick={() => setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-white/5">
                    <UserIcon className="h-4 w-4" /> Dashboard
                  </Link>
                  <button onClick={() => { setMenu(false); logout(); navigate({ to: "/" }); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-white/5">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">Login</Link>
              <Link to="/signup" className="btn-glow inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium animate-pulse-glow">
                Get started
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong border-t border-border/60 px-6 py-4 space-y-3"
        >
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { logout(); setOpen(false); navigate({ to: "/" }); }} className="btn-glow inline-flex rounded-full px-4 py-2 text-sm font-medium">
              Sign out
            </button>
          ) : (
            <Link to="/signup" onClick={() => setOpen(false)} className="btn-glow inline-flex rounded-full px-4 py-2 text-sm font-medium">
              Get started
            </Link>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
