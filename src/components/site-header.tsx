import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AGENCY, GENERIC_MESSAGE } from "@/lib/content";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Voos", href: "#voos" },
  { label: "Pacotes", to: "/pacotes" as const },
  { label: "Calendário", href: "#calendario" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#faq" },
];

function Wordmark() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label={`${AGENCY.name} — página inicial`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-ink-soft text-gold transition-colors group-hover:border-gold">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 16.5 22 7.5 13.5 20l-1.8-5.2L2 16.5Z" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-wide text-cream">Infinity</span>
        <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-gold">
          Travel · Bauru
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-ink/92 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5">
        <Wordmark />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) =>
            "to" in item ? (
              <Link
                key={item.label}
                to={item.to}
                className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(GENERIC_MESSAGE)}`} size="sm" className="hidden sm:inline-flex">
            Falar no WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                  open && "-translate-y-1 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pt-4 pb-6">
          {NAV.map((item) =>
            "to" in item ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-2xl text-cream"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-2xl text-cream"
              >
                {item.label}
              </a>
            ),
          )}
          <WhatsAppButton
            href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(GENERIC_MESSAGE)}`}
            size="md"
            className="mt-4"
          >
            Falar no WhatsApp
          </WhatsAppButton>
        </nav>
      </div>
    </header>
  );
}
