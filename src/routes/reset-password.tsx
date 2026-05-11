import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { api, setToken } from "@/lib/api";
import { passwordStrength } from "@/lib/password";
import { Field } from "./login";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — StackWise" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ token: (s.token as string) || "" }),
  component: ResetPage,
});

function ResetPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = passwordStrength(password);

  useEffect(() => { if (!token) toast.error("Missing reset token"); }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Missing reset token");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    try {
      const { token: jwt } = await api.reset(token, password);
      setToken(jwt);
      toast.success("Password updated");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Reset failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose something strong — at least 8 characters"
      footer={<><Link to="/login" className="text-foreground hover:underline">Back to sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="New password">
          <div className="relative">
            <input type={show ? "text" : "password"} required minLength={8} autoComplete="new-password"
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
        <button type="submit" disabled={loading || !token}
          className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Update password
        </button>
      </form>
    </AuthShell>
  );
}
