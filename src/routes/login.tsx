import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";
import { isEmail } from "@/lib/password";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — StackWise" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate({ to: "/dashboard" }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) return toast.error("Enter a valid email");
    if (!password) return toast.error("Enter your password");
    setLoading(true);
    try {
      await login(email, password, remember);
      toast.success("Welcome back");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your StackWise account"
      footer={<>Don't have an account? <Link to="/signup" className="text-foreground hover:underline">Create one</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email">
          <input
            type="email" autoComplete="email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
        </Field>
        <Field
          label="Password"
          right={<Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link>}
        >
          <div className="relative">
            <input
              type={show ? "text" : "password"} autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="auth-input pr-10"
            />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <label className="flex items-center gap-2 text-sm text-muted-foreground select-none">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-transparent" />
          Remember me
        </label>
        <button type="submit" disabled={loading}
          className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </AuthShell>
  );
}

export function Field({ label, right, children }: { label: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium">{label}</label>
        {right}
      </div>
      {children}
    </div>
  );
}
