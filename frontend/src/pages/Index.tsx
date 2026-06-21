import { useEffect, useMemo, useState } from "react";
import { movies, GENRES, type Movie } from "@/lib/movies";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export default function Index() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<(typeof GENRES)[number]>("All");
  const [selected, setSelected] = useState<Movie | null>(null);

  useEffect(() => {
    document.title = "Reel — A Quiet Movie Index";
  }, []);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchesGenre = genre === "All" || m.genre.includes(genre);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q));
      return matchesGenre && matchesQuery;
    });
  }, [query, genre]);

  const featured = movies[3];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 pb-32 pt-10 md:pt-16">
        <section className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="animate-rise">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Vol. 01 · Curated · Updated weekly
            </p>
            <h1 className="font-display mt-5 text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
              Films worth
              <br />
              <span className="italic">your evening.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              A small, hand-tended index of cinema — no autoplay, no algorithm.
              Search a director, pick a mood, and stay a while.
            </p>
          </div>
          <div className="relative hidden aspect-[4/5] overflow-hidden border border-border md:block">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop&sat=-100"
              alt="A dimly lit cinema interior"
              className="h-full w-full object-cover grayscale"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="w-full md:max-w-sm">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, director, actor…"
                className="mt-2 w-full border-b border-foreground/30 bg-transparent pb-2 text-lg font-light placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={
                    "rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all duration-300 " +
                    (genre === g
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground")
                  }
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </section>

        {genre === "All" && !query && (
          <FeaturedCard movie={featured} onOpen={() => setSelected(featured)} />
        )}

        <section className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="font-display text-2xl font-light tracking-tight">The Index</h2>
            <span className="text-xs tabular-nums text-muted-foreground">
              {filtered.length.toString().padStart(2, "0")} titles
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted-foreground">
              Nothing here. Try another name.
            </p>
          ) : (
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} onOpen={() => setSelected(m)} />
              ))}
            </ul>
          )}
        </section>
      </main>

      <SiteFooter />

      {selected && <MovieDialog movie={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function FeaturedCard({ movie, onOpen }: { movie: Movie; onOpen: () => void }) {
  return (
    <section className="mt-12 animate-fade">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Editor's pick
      </p>
      <button
        onClick={onOpen}
        className="group mt-4 grid w-full grid-cols-1 gap-8 border border-border bg-background p-6 text-left transition-colors duration-500 hover:border-foreground md:grid-cols-[1fr_1.4fr] md:p-8"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>{movie.year}</span>
              <span className="h-px w-6 bg-border" />
              <span>{movie.genre.join(" · ")}</span>
            </div>
            <h3 className="font-display mt-4 text-4xl font-light leading-tight tracking-tight md:text-5xl">
              {movie.title}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {movie.synopsis}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              dir. <span className="text-foreground">{movie.director}</span>
            </span>
            <span className="text-xs uppercase tracking-[0.25em] transition-transform duration-500 group-hover:translate-x-1">
              Read more →
            </span>
          </div>
        </div>
      </button>
    </section>
  );
}

function MovieCard({
  movie,
  index,
  onOpen,
}: {
  movie: Movie;
  index: number;
  onOpen: () => void;
}) {
  return (
    <li>
      <button
        onClick={onOpen}
        style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
        className="group block w-full text-left animate-rise"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent" />
          <span className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.2em] text-background/90">
            {movie.year}
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-light leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
            {movie.title}
          </h3>
          <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
            {movie.runtime}′
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{movie.director}</p>
      </button>
    </li>
  );
}

function MovieDialog({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 animate-fade backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 gap-8 overflow-y-auto border border-border bg-background p-6 animate-rise md:grid-cols-[1fr_1.4fr] md:p-10"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
        >
          Close ✕
        </button>
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>{movie.year}</span>
            <span className="h-px w-6 bg-border" />
            <span>{movie.runtime} min</span>
            <span className="h-px w-6 bg-border" />
            <span>{movie.country}</span>
          </div>
          <h3 className="font-display text-4xl font-light leading-tight tracking-tight">
            {movie.title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">{movie.synopsis}</p>
          <dl className="mt-2 grid grid-cols-1 gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
            <Meta label="Director" value={movie.director} />
            <Meta label="Genre" value={movie.genre.join(", ")} />
            <Meta label="Cast" value={movie.cast.join(", ")} />
            <Meta label="Rating" value={`${movie.rating.toFixed(1)} / 10`} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
