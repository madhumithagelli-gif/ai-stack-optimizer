import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";
import { isEmail, passwordStrength } from "@/lib/password";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — StackWise" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = passwordStrength(password);

  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Enter your name");
    if (!isEmail(email)) return toast.error("Enter a valid email");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    try {
      await signup(name.trim(), email, password);
      toast.success("Account created");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start saving on AI tools in minutes"
      footer={<>Already have an account? <Link to="/login" className="text-foreground hover:underline">Sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="auth-input" />
        </Field>
        <Field label="Email">
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input type={show ? "text" : "password"} required autoComplete="new-password" minLength={8}
              value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input pr-10" />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0,1,2,3].map(i => (
                  <div key={i} className="h-1 flex-1 rounded-full bg-border/50 overflow-hidden">
                    <div className="h-full transition-all" style={{ width: i < strength.score ? "100%" : "0%", background: strength.color }} />
                  </div>
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{strength.label}</p>
            </div>
          )}
        </Field>
        <button type="submit" disabled={loading}
          className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create account
        </button>
        <p className="text-xs text-muted-foreground text-center">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
