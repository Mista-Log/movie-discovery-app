import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { authApi } from "@/lib/api";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ErrorNote, Field, SubmitButton } from "@/components/auth-shell";

export default function Profile() {
  const { user, loading, refresh, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/signin");
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 pt-24 text-sm text-muted-foreground">
          Loading…
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-12 md:pt-16">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Account</p>
        <h1 className="font-display mt-3 text-5xl font-light leading-[1.05] tracking-tight">
          {user.email.split("@")[0]}.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Signed in as <span className="text-foreground">{user.email}</span>
        </p>

        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-display text-xl font-light tracking-tight">Change email</h2>
          <EmailForm currentEmail={user.email} onSaved={refresh} />
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-xl font-light tracking-tight">Change password</h2>
          <PasswordForm />
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-xl font-light tracking-tight">Session</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign out of Reel on this device.
          </p>
          <button
            onClick={() => {
              signOut();
              navigate("/");
            }}
            className="mt-5 border border-foreground/30 px-4 py-2.5 text-xs uppercase tracking-[0.25em] transition-colors hover:border-foreground"
          >
            Sign out
          </button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function EmailForm({ currentEmail, onSaved }: { currentEmail: string; onSaved: () => void }) {
  const [email, setEmail] = useState(currentEmail);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      await authApi.update({ email: email.trim() });
      await onSaved();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update email");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
      <Field
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorNote message={error} />
      <div className="flex items-center gap-3">
        <SubmitButton loading={status === "saving"}>
          {status === "saved" ? "Saved" : "Save email"}
        </SubmitButton>
      </div>
    </form>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (next.length < 8) return setError("New password must be at least 8 characters.");
    if (next !== confirm) return setError("New passwords don't match.");
    setStatus("saving");
    try {
      await authApi.update({ current_password: current, password: next });
      setCurrent("");
      setNext("");
      setConfirm("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update password");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
      <Field
        label="Current password"
        type="password"
        autoComplete="current-password"
        required
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <Field
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        value={next}
        onChange={(e) => setNext(e.target.value)}
      />
      <Field
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <ErrorNote message={error} />
      <SubmitButton loading={status === "saving"}>
        {status === "saved" ? "Saved" : "Update password"}
      </SubmitButton>
    </form>
  );
}
