import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-foreground" />
          <span className="font-display text-xl tracking-tight">Reel</span>
        </Link>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-foreground">
            Index
          </Link>
          {user && (
            <Link to="/profile" className="transition-colors hover:text-foreground">
              Profile
            </Link>
          )}
        </nav>
        {user ? (
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
            <span className="hidden text-muted-foreground sm:inline">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <Link
              to="/signin"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="border border-foreground bg-foreground px-3 py-1.5 text-background transition-opacity hover:opacity-85"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="uppercase tracking-[0.25em]">© Reel — A quiet index</p>
        <p className="uppercase tracking-[0.25em]">Set in Fraunces & Inter Tight</p>
      </div>
    </footer>
  );
}
