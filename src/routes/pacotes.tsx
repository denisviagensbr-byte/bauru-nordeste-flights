import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DESTINATIONS,
  PACKAGES,
  SEASONS,
  GENERIC_MESSAGE,
  whatsappLink,
  type SeasonId,
} from "@/lib/content";
import { Kicker, Pill } from "@/components/ui-kit";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

type DestFilter = "todos" | string;
type SeasonFilter = "todas" | SeasonId;

export const Route = createFileRoute("/pacotes")({
  head: () => ({
    meta: [
      { title: "Pacotes de Bauru para o Nordeste | Infinity Travel Bauru" },
      {
        name: "description",
        content:
          "Pacotes Azul Viagens com voos diretos de Bauru: Porto Seguro aos sábados; Maceió, Porto de Galinhas e Recife em janeiro de 2027.",
      },
      {
        property: "og:title",
        content: "Pacotes de Bauru para o Nordeste | Infinity Travel",
      },
      {
        property: "og:description",
        content:
          "Consulte pacotes para Porto Seguro, Maceió, Porto de Galinhas e Recife com voos diretos saindo de Bauru.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const [dest, setDest] = useState<DestFilter>("todos");
  const [season, setSeason] = useState<SeasonFilter>("todas");

  const list = useMemo(
    () =>
      PACKAGES.filter(
        (p) =>
          (dest === "todos" || p.destinationSlug === dest) &&
          (season === "todas" || p.season === season),
      ),
    [dest, season],
  );

  const seasonOptions: SeasonFilter[] = ["todas", "sabados", "julho2027", "dezjan"];

  return (
    <div className="pt-28">
      <section className="border-b border-line py-14">
        <div className="mx-auto max-w-6xl px-5">
          <Kicker>Catálogo</Kicker>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] font-light text-cream">
            Todos os pacotes de Bauru para o Nordeste
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Monte o seu combinando destino e temporada. Cada pacote já vai com passagem,
            hospedagem e transfer — e o botão abre a conversa com a mensagem pronta.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Destino
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterChip active={dest === "todos"} onClick={() => setDest("todos")}>
                  Todos
                </FilterChip>
                {DESTINATIONS.map((d) => (
                  <FilterChip key={d.slug} active={dest === d.slug} onClick={() => setDest(d.slug)}>
                    {d.name}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Temporada
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {seasonOptions.map((s) => (
                  <FilterChip
                    key={s}
                    active={season === s}
                    onClick={() => setSeason(s)}
                  >
                    {s === "todas" ? "Todas" : SEASONS[s].short}
                  </FilterChip>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {list.length} {list.length === 1 ? "pacote" : "pacotes"}
          </p>

          {list.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((pkg, i) => (
                <Reveal key={pkg.id} delay={i * 60}>
                  <PackageCard pkg={pkg} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-line bg-ink-soft/50 p-10 text-center">
              <p className="font-display text-2xl text-cream">
                Nada com esse filtro — mas dá para montar.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Me diga a data e o número de pessoas que eu busco as opções disponíveis para o
                seu perfil.
              </p>
              <WhatsAppButton href={whatsappLink(GENERIC_MESSAGE)} size="md" className="mt-6">
                Pedir cotação personalizada
              </WhatsAppButton>
            </div>
          )}

          <div className="mt-16 rounded-2xl border border-line bg-ink-soft/40 p-8 text-center">
            <Pill>Azul Viagens</Pill>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Os valores exibidos são exemplos de pacote, sujeitos a disponibilidade no momento
              da cotação. O preço real, o parcelamento e as datas você recebe no WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <WhatsAppButton href={whatsappLink(GENERIC_MESSAGE)} size="md">
                Falar no WhatsApp
              </WhatsAppButton>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Voltar para o início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
        active
          ? "border-gold bg-gold text-primary-foreground"
          : "border-line text-muted-foreground hover:border-line-strong hover:text-cream",
      )}
    >
      {children}
    </button>
  );
}
