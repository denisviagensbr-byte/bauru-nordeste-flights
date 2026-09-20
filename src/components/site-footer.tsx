import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/logo-infinity.png";
import { AGENCY, DESTINATIONS, GENERIC_MESSAGE } from "@/lib/content";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-soft/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logoImage} alt="Grupo Infinity Travel" className="h-20 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Agência de viagens em Bauru especializada nas saídas para o Nordeste, com pacotes
            Azul Viagens montados, emitidos e acompanhados por nós — do primeiro WhatsApp até o
            retorno em Bauru.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton
              href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(GENERIC_MESSAGE)}`}
              size="md"
            >
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href={AGENCY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {AGENCY.instagram}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Destinos
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {DESTINATIONS.map((d) => (
              <li key={d.slug}>
                <Link
                  to="/destinos/$slug"
                  params={{ slug: d.slug }}
                  className="text-muted-foreground transition-colors hover:text-cream"
                >
                  {d.name}
                  <span className="text-line-strong"> · </span>
                  <span className="text-xs text-muted-foreground/70">{d.schedule}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Atendimento
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>{AGENCY.city}</li>
            <li>{AGENCY.address}</li>
            <li>{AGENCY.hours}</li>
            <li>
              <a
                className="transition-colors hover:text-cream"
                href={`https://wa.me/${AGENCY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {AGENCY.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[0.72rem] text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {AGENCY.name}. Pacotes operados pela {AGENCY.operator}.
          </p>
          <p>
            Valores e hotéis exibidos no site são exemplos de pacote, sujeitos a disponibilidade
            no momento da cotação.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Button that follows the visitor and always opens WhatsApp. */
export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(GENERIC_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Infinity Travel no WhatsApp"
      className="fixed right-4 bottom-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-gold text-primary-foreground shadow-gold transition-all duration-300 hover:scale-105 hover:bg-gold-soft sm:right-8 sm:bottom-8 sm:h-14 sm:w-14"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.501-5.243c0-5.45 4.436-9.886 9.886-9.886 2.64 0 5.122 1.03 6.988 2.732a9.825 9.825 0 012.732 6.988c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
