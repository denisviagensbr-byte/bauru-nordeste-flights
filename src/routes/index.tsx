import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-bauru-nordeste.jpg";
import fachadaAsset from "@/assets/fachada-infinity-travel.jpg.asset.json";
import {
  AGENCY,
  DESTINATIONS,
  FAQ,
  FEATURED_PACKAGES,
  JULY_2027_SATURDAYS,
  NEXT_SATURDAYS,
  REASONS,
  SEASONS,
  STEPS,
  GENERIC_MESSAGE,
  packageMessage,
  whatsappLink,
} from "@/lib/content";
import { Kicker, Pill, SectionHeading, DestinationImage, DestinationLink } from "@/components/ui-kit";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Voos de Bauru para o Nordeste todo sábado | Infinity Travel Bauru",
      },
      {
        name: "description",
        content:
          "Porto Seguro todo sábado até setembro de 2027, e julho de 2027 em destaque. Maceió, Porto de Galinhas e Recife em dezembro e janeiro. Pacotes Azul Viagens com passagem, hotel e transfer. Fale com a Infinity Travel Bauru.",
      },
      {
        property: "og:title",
        content: "De Bauru para o Nordeste, todo sábado | Infinity Travel",
      },
      {
        property: "og:description",
        content:
          "Porto Seguro todo sábado até setembro de 2027 e julho de 2027. Maceió, Porto de Galinhas e Recife em dezembro e janeiro. Pacotes Azul Viagens montados pela Infinity Travel Bauru.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b0d12" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImage,
        fetchPriority: "high" as const,
      },
    ],
  }),
  component: HomePage,
});

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: AGENCY.name,
  areaServed: "Bauru, SP",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Ver. Joaquim da Silva Martha, 17-9 - Jardim Estoril",
    addressLocality: "Bauru",
    addressRegion: "SP",
    postalCode: "17011-170",
    addressCountry: "BR",
  },
  telephone: `+${AGENCY.whatsapp}`,
  sameAs: [AGENCY.instagramUrl],
  makesOffer: DESTINATIONS.map((d) => ({
    "@type": "Offer",
    itemOffered: { "@type": "TouristTrip", name: `${d.name} saindo de Bauru` },
  })),
});

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Costa do Nordeste brasileiro vista do alto ao entardecer"
        width={1536}
        height={864}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/45 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-transparent to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pt-32 pb-16">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.9rem,8vw,5.6rem)] leading-[0.95] font-light text-cream">
            De Bauru para o Nordeste,
            <span className="block text-gold">todo sábado.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Porto Seguro sai todos os sábados até setembro de 2027 — e julho de 2027 já está aberto.
            Maceió, Porto de Galinhas e Recife entram em dezembro e janeiro. A gente fecha
            passagem, hotel e transfer no mesmo pacote.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              href={whatsappLink(GENERIC_MESSAGE)}
              size="lg"
            >
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href="#voos"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Ver os voos
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {[
              ["4", "destinos"],
              ["Sáb", "saídas toda semana"],
              ["Jul/27", "férias abertas"],
              ["Dez·Jan", "temporada de verão"],
            ].map(([big, small]) => (
              <div key={small}>
                <dt className="font-display text-3xl leading-none text-gold">{big}</dt>
                <dd className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {small}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Flights() {
  return (
    <section id="voos" className="scroll-mt-24 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="Nossos voos"
            title={
              <>
                Quatro destinos, todos saindo <em className="text-gold not-italic">de Bauru</em>
              </>
            }
            lead="Um voo fixo a semana inteira e três destinos de temporada. Escolha o seu e receba a cotação no mesmo dia."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90} as="article">
              <div className="group h-full overflow-hidden rounded-2xl border border-line bg-ink-soft/60 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                <DestinationImage
                  slug={d.slug}
                  className="aspect-[16/10]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="p-7">
                  <div className="flex flex-wrap gap-2">
                    {d.badges.map((b) => (
                      <Pill key={b}>{b}</Pill>
                    ))}
                  </div>
                  <h3 className="mt-5 flex items-baseline gap-3 font-display text-3xl text-cream">
                    {d.name}
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {d.state}
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.forWhom}</p>
                  <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold">
                    {d.schedule}
                  </p>
                  <div className="mt-6">
                    <DestinationLink slug={d.slug}>Ver pacotes e dicas</DestinationLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  return (
    <section id="pacotes" className="scroll-mt-24 border-t border-line bg-ink-soft/30 py-24 surface-noise">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="Pacotes em destaque"
              title="Exemplos de pacote para você já se imaginar lá"
              lead="Passagem, hospedagem, refeições e transfer no mesmo contrato. Os valores são exemplos — a cotação real vai no WhatsApp em minutos."
            />
            <a
              href="/pacotes"
              className="hidden text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-soft sm:inline-flex"
            >
              Ver todos os pacotes →
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURED_PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 80}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading kicker="Como funciona" title="Três passos, um WhatsApp" />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 90} as="li">
              <div className="h-full rounded-2xl border border-line bg-ink-soft/50 p-7">
                <span className="font-display text-5xl leading-none text-line-strong">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-2xl text-cream">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyInfinity() {
  return (
    <section className="border-t border-line bg-ink-soft/30 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div>
            <SectionHeading
              kicker="Por que a Infinity"
              title="Quem vende, acompanha"
              lead="Pacote bom não é só preço: é saber com quem você fala quando algo muda. Aqui é a mesma pessoa do começo ao fim."
            />
            <WhatsAppButton
              href={whatsappLink(GENERIC_MESSAGE)}
              size="md"
              className="mt-8"
            >
              Falar com a Infinity
            </WhatsAppButton>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div className="h-full rounded-xl border border-line bg-ink/60 p-6 transition-colors hover:border-line-strong">
                <span aria-hidden className="block h-6 w-6 rounded-full border border-line-strong bg-gold/10 text-center font-display text-sm leading-[1.35rem] text-gold">
                  ✦
                </span>
                <h3 className="mt-4 font-display text-xl text-cream">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calendar() {
  return (
    <section id="calendario" className="scroll-mt-24 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="Calendário 2026 / 2027"
            title="Quando cada voo sai"
            lead="Porto Seguro tem saída toda semana até setembro de 2027. Julho de 2027 e a temporada de verão têm janelas próprias — vale reservar com antecedência."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-2xl border border-line-strong bg-ink-soft/60 p-7">
              <Pill>{SEASONS.sabados.label}</Pill>
              <h3 className="mt-5 font-display text-2xl text-cream">Porto Seguro</h3>
              <p className="mt-2 text-sm text-muted-foreground">{SEASONS.sabados.note}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                {NEXT_SATURDAYS.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-line bg-ink/60 px-3 py-2 text-cream"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                E todos os sábados seguintes, até setembro de 2027.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-2xl border border-line-strong bg-ink-soft/60 p-7">
              <Pill>{SEASONS.julho2027.label}</Pill>
              <h3 className="mt-5 font-display text-2xl text-cream">Porto Seguro</h3>
              <p className="mt-2 text-sm text-muted-foreground">{SEASONS.julho2027.note}</p>
              <ul className="mt-6 grid grid-cols-3 gap-2 text-sm">
                {JULY_2027_SATURDAYS.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-line bg-ink/60 px-3 py-2 text-center text-cream"
                  >
                    {s}/07
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Férias de julho em família: 7 ou 10 noites, com pacotes próprios.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="h-full rounded-2xl border border-line bg-ink-soft/60 p-7">
              <Pill>{SEASONS.dezjan.label}</Pill>
              <h3 className="mt-5 font-display text-2xl text-cream">Maceió · Porto de Galinhas · Recife</h3>
              <p className="mt-2 text-sm text-muted-foreground">{SEASONS.dezjan.note}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  ["Réveillon", "saída em 26 de dezembro"],
                  ["Recesso", "saída em 19 de dezembro"],
                  ["Ponte de janeiro", "feriados de janeiro"],
                  ["Volta às aulas", "últimas saídas em janeiro"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <span className="text-cream">{k}</span>
                    <span className="text-xs text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line bg-ink-soft/30 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading kicker="Dúvidas frequentes" title="Antes de fechar o pacote" />
        </Reveal>
        <div>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-xl text-cream">{item.q}</span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                    <span className="block pb-5">{item.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCall() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25">
        <img
          src={DESTINATIONS[0]?.image}
          alt=""
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <Kicker>Próximo passo</Kicker>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-light text-cream">
            Me conta a data que eu monto o seu pacote
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Quantas pessoas, qual destino e quantas noites. Em minutos você recebe as opções da{" "}
            {AGENCY.operator} com valores e formas de pagamento.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              href={whatsappLink(
                `Olá! Quero uma cotação de pacote para o Nordeste saindo de Bauru. Somos em ___ pessoas e gostaria de ${
                  DESTINATIONS[0]?.name ?? "Porto Seguro"
                }.`,
              )}
              size="lg"
            >
              Quero uma cotação
            </WhatsAppButton>
            <a
              href="/pacotes"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Ver todos os pacotes
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            {AGENCY.city} · {AGENCY.hours}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function VisitUs() {
  return (
    <section id="loja" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <img
              src={fachadaAsset.url}
              alt="Fachada da Infinity Travel Bauru no Jardim Estoril"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Kicker>Nossa loja</Kicker>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] text-cream sm:text-5xl">
            Prefere conversar pessoalmente?
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground">
            Nossa agência fica no Jardim Estoril, em Bauru. Passe para tomar um café e montar sua
            viagem com o {AGENCY.agent} e a equipe.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-cream/90">
            <li className="flex gap-3">
              <span className="mt-0.5 text-gold">📍</span>
              <span>{AGENCY.address}</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-gold">🕘</span>
              <span>{AGENCY.hours}</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-gold">💬</span>
              <span>WhatsApp {AGENCY.whatsappDisplay}</span>
            </li>
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={AGENCY.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Abrir no Google Maps
            </a>
            <WhatsAppButton href={whatsappLink(GENERIC_MESSAGE)}>
              Chamar no WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Flights />
      <FeaturedPackages />
      <HowItWorks />
      <WhyInfinity />
      <Calendar />
      <Faqs />
      <VisitUs />
      <FinalCall />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON_LD }}
      />
    </>
  );
}
