import { AGENCY, packageMessage, packagesOf, type Pkg } from "@/lib/content";
import { whatsappLink } from "@/lib/content";
import { Pill } from "@/components/ui-kit";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

export const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** One package: hotel, meals, what it includes, price and WhatsApp CTA. */
export function PackageCard({ pkg, compact = false }: { pkg: Pkg; compact?: boolean }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line bg-ink-soft/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
        compact && "p-5",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Pill>{pkg.seasonLabel}</Pill>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {pkg.destinationName}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl leading-tight text-cream">{pkg.title}</h3>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Noites
          </dt>
          <dd className="mt-1 text-cream">{pkg.nights}</dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Refeições
          </dt>
          <dd className="mt-1 text-cream">{pkg.meal}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Hospedagem
          </dt>
          <dd className="mt-1 text-cream">{pkg.hotel}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Datas
          </dt>
          <dd className="mt-1 text-cream">{pkg.dates}</dd>
        </div>
      </dl>

      <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-muted-foreground">
        {pkg.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-1 flex-col justify-end">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          A partir de, por pessoa
        </p>
        <p className="mt-1 font-display text-4xl leading-none text-gold">
          {brl.format(pkg.price)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {pkg.example ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1">
              valor de exemplo — sujeito a disponibilidade
            </span>
          ) : (
            <>Parcelamos no cartão nas condições da {AGENCY.operator}.</>
          )}
        </p>
        <WhatsAppButton
          href={whatsappLink(packageMessage(pkg))}
          size="sm"
          className="mt-5 w-full"
        >
          Quero esse pacote
        </WhatsAppButton>
      </div>
    </article>
  );
}

/** Packages of one destination, used on the destination pages. */
export function PackageList({ slug }: { slug: string }) {
  const list = packagesOf(slug);
  if (list.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {list.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
