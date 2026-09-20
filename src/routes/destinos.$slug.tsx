import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  DESTINATIONS,
  GENERIC_MESSAGE,
  SEASONS,
  findDestination,
  packagesOf,
  whatsappLink,
} from "@/lib/content";
import { DestinationImage, Kicker, Pill } from "@/components/ui-kit";
import { PackageList } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/destinos/$slug")({
  loader: ({ params }) => {
    const destination = findDestination(params.slug);
    if (!destination) throw notFound();
    return destination;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Destino não encontrado | Infinity Travel Bauru" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: loaderData.seoTitle },
        { name: "description", content: loaderData.seoDescription },
        { property: "og:title", content: loaderData.seoTitle },
        { property: "og:description", content: loaderData.seoDescription },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DestinationPage,
  notFoundComponent: DestinationNotFound,
});

function DestinationPage() {
  const destination = Route.useLoaderData();
  const packages = packagesOf(destination.slug);

  return (
    <div className="pt-24">
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-end">
          <Reveal>
            <div>
              <Kicker>{destination.kicker}</Kicker>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.8rem)] leading-[0.98] font-light text-cream">
                {destination.name}
                <span className="block text-[0.32em] font-sans font-semibold tracking-[0.2em] text-gold uppercase">
                  {destination.state} · saindo de Bauru
                </span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-2">
                {destination.badges.map((b) => (
                  <Pill key={b}>{b}</Pill>
                ))}
              </div>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                {destination.intro}
              </p>
              <p className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold">
                {destination.schedule}
              </p>
              <WhatsAppButton
                href={whatsappLink(
                  `Olá! Quero uma cotação para ${destination.name} saindo de Bauru (${destination.schedule}). Pode me enviar as opções?`,
                )}
                size="lg"
                className="mt-8"
              >
                Cotar {destination.name}
              </WhatsAppButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <DestinationImage
              slug={destination.slug}
              eager
              className="aspect-[4/3] rounded-2xl border border-line"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl text-cream">Para quem é</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{destination.forWhom}</p>
              <ul className="mt-8 space-y-3">
                {destination.highlights.map((h) => (
                  <li key={h} className="flex gap-3 border-b border-line pb-3 text-sm text-cream">
                    <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-ink-soft/50 p-8">
              <h2 className="font-display text-3xl text-cream">O que levar</h2>
              <ul className="mt-6 space-y-4">
                {destination.tips.map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-display text-2xl leading-none text-line-strong">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-line bg-ink/60 p-5">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  Temporada
                </p>
                {destination.seasons.map((s) => (
                  <p key={s} className="mt-3 text-sm text-muted-foreground">
                    <span className="text-cream">{SEASONS[s].label}:</span> {SEASONS[s].note}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <Kicker>Pacotes</Kicker>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream">
              Pacotes {destination.name} · exemplos
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Passagem, hospedagem, refeições e transfer no mesmo contrato. Toque em um pacote e
              a conversa já abre com a mensagem pronta.
            </p>
          </Reveal>
          <div className="mt-10">
            <PackageList slug={destination.slug} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-soft/40 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
          <h2 className="max-w-xl font-display text-3xl leading-tight text-cream">
            Não achou a data ideal?
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            A gente busca outras combinações de voo e hotel para {destination.name}, inclusive
            fora das janelas exibidas aqui.
          </p>
          <WhatsAppButton href={whatsappLink(GENERIC_MESSAGE)} size="lg">
            Falar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}

function DestinationNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <Kicker>Ops</Kicker>
      <h1 className="font-display text-4xl text-cream">Esse destino ainda não está aqui</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Os destinos com saída de Bauru hoje são Porto Seguro, Maceió, Porto de Galinhas e Recife.
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {DESTINATIONS.map((d) => (
          <li key={d.slug}>
            <a
              href={`/destinos/${d.slug}`}
              className="inline-flex rounded-full border border-line-strong px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {d.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
