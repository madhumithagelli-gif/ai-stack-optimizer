import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { api } from "@/lib/api";
import { isEmail } from "@/lib/password";
import { Field } from "./login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — StackWise" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) return toast.error("Enter a valid email");
    setLoading(true);
    try {
      await api.forgot(email);
      setSent(true);
      toast.success("If that email exists, a reset link was sent");
    } catch (err: any) {
      toast.error(err.message || "Request failed");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Forgot password"
      subtitle="We'll email you a link to reset it"
      footer={<><Link to="/login" className="text-foreground hover:underline">Back to sign in</Link></>}
    >
      {sent ? (
        <p className="text-sm text-muted-foreground">
          Check your inbox for a reset link. It expires in 15 minutes.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Email">
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" />
          </Field>
          <button type="submit" disabled={loading}
            className="btn-glow w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  );
}
