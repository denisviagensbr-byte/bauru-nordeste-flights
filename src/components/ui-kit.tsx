import { cn } from "@/lib/utils";
import { DESTINATIONS } from "@/lib/content";
import { Link } from "@tanstack/react-router";

/** Gold pill used for badges such as "Sábados, o ano todo" or "Julho 2027". */
export function Pill({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "neutral";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] whitespace-nowrap",
        tone === "gold"
          ? "border-line-strong bg-gold/10 text-gold"
          : "border-white/10 bg-white/5 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small line of eyebrow text above a section title. */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      {children}
    </span>
  );
}

/** Section title + optional lead paragraph. */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
      )}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] font-light text-cream sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  );
}

/** Destination image with the gold-tinted frame used across the site. */
export function DestinationImage({
  slug,
  className,
  sizes,
  eager = false,
  label,
}: {
  slug: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  label?: string;
}) {
  const destination = DESTINATIONS.find((d) => d.slug === slug);
  if (!destination) return null;

  return (
    <div className={cn("relative overflow-hidden bg-ink-raised", className)}>
      <img
        src={destination.image}
        alt={destination.imageAlt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        width={1200}
        height={800}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
      />
      {label && (
        <span className="absolute bottom-4 left-4 font-display text-2xl leading-none text-cream drop-shadow-lg">
          {label}
        </span>
      )}
    </div>
  );
}

/** Link to a destination page, typed so the route always exists. */
export function DestinationLink({
  slug,
  children,
  className,
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to="/destinos/$slug"
      params={{ slug }}
      className={cn(
        "inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-soft",
        className,
      )}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
