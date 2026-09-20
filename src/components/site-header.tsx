import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/logo-infinity.png";
import { AGENCY, GENERIC_MESSAGE } from "@/lib/content";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Calendário", href: "#calendario" },
  { label: "Promoções", href: "#pacotes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Todos os pacotes", to: "/pacotes" as const },
];

function Wordmark() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label={`${AGENCY.name} — página inicial`}
    >
      <img
        src={logoImage}
        alt="Grupo Infinity Travel"
        className="h-10 w-auto shrink-0 transition-transform duration-500 group-hover:scale-[1.04] sm:h-11 lg:h-12"
      />
      <span className="hidden h-8 w-px bg-line-strong xl:block" />
      <span className="hidden text-[0.58rem] font-semibold uppercase leading-[1.6] tracking-[0.26em] text-gold xl:block">
        Bauru
        <br />
        <span className="text-muted-foreground">Nordeste</span>
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
          "overflow-hidden backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open
            ? "max-h-[34rem] border-b border-line bg-ink/98 opacity-100"
            : "max-h-0 opacity-0",
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
