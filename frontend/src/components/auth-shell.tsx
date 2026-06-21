import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col px-6 pb-24 pt-16">
        <Link
          to="/"
          className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to index
        </Link>
        <h1 className="font-display mt-8 text-5xl font-light leading-[1.05] tracking-tight animate-rise">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-10 animate-fade">{children}</div>
        <p className="mt-8 text-xs text-muted-foreground">{footer}</p>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 w-full border-b border-foreground/30 bg-transparent pb-2 text-base font-light placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors"
      />
    </label>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full border border-foreground bg-foreground px-4 py-3 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
    >
      {loading ? "…" : children}
    </button>
  );
}

export function ErrorNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded border border-foreground/20 bg-foreground/5 px-3 py-2 text-xs text-foreground">
      {message}
    </p>
  );
}
