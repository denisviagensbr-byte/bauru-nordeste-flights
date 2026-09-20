import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui-kit";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { whatsappLink } from "@/lib/content";
import { cn } from "@/lib/utils";

const MONTHS = [
  { year: 2026, month: 8 },
  { year: 2026, month: 9 },
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2027, month: 0 },
  { year: 2027, month: 1 },
  { year: 2027, month: 2 },
  { year: 2027, month: 3 },
  { year: 2027, month: 4 },
  { year: 2027, month: 5 },
  { year: 2027, month: 6 },
  { year: 2027, month: 7 },
  { year: 2027, month: 8 },
];

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

function getMonthCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ];
}

function getDeparture(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  const portoSeguro = date.getDay() === 6;
  const pernambuco = year === 2027 && month === 0 && day >= 3 && day <= 8;
  return { portoSeguro, pernambuco };
}

export function FlightCalendar() {
  const [monthIndex, setMonthIndex] = useState(0);
  const current = MONTHS[monthIndex];
  if (!current) return null;

  const cells = getMonthCells(current.year, current.month);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(current.year, current.month, 1));

  return (
    <section id="calendario" className="scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <SectionHeading
            kicker="Calendário de saídas"
            title="Escolha quando viajar"
            lead="Os dias marcados têm voos saindo de Bauru. Navegue pelos meses e consulte sua data pelo WhatsApp."
          />

          <div className="mt-7 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-cream">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-gold" />
              Porto Seguro — todos os sábados até setembro de 2027
            </div>
            <div className="flex items-center gap-3 text-cream">
              <span className="h-3 w-3 shrink-0 rounded-sm border border-gold bg-cream" />
              Porto de Galinhas e Recife — 03 a 08 de janeiro de 2027
            </div>
            <p className="border-t border-line pt-4 text-muted-foreground">
              Maceió: datas ainda serão confirmadas.
            </p>
          </div>

          <WhatsAppButton
            href={whatsappLink(`Olá! Quero consultar uma saída de Bauru em ${monthLabel}. Pode me enviar as opções?`)}
            className="mt-7"
          >
            Consultar este mês
          </WhatsAppButton>
        </div>

        <div className="border border-line-strong bg-ink-soft/60 p-4 sm:p-7">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-line pb-5">
            <button
              type="button"
              aria-label="Mês anterior"
              disabled={monthIndex === 0}
              onClick={() => setMonthIndex((value) => Math.max(0, value - 1))}
              className="grid h-10 w-10 shrink-0 place-items-center border border-line text-cream transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="min-w-0 text-center font-display text-2xl capitalize text-cream sm:text-3xl">
              {monthLabel}
            </h3>
            <button
              type="button"
              aria-label="Próximo mês"
              disabled={monthIndex === MONTHS.length - 1}
              onClick={() => setMonthIndex((value) => Math.min(MONTHS.length - 1, value + 1))}
              className="grid h-10 w-10 shrink-0 place-items-center border border-line text-cream transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((day, index) => (
              <div key={`${day}-${index}`} className="pb-2 text-center text-[0.64rem] font-semibold uppercase text-muted-foreground">
                {day}
              </div>
            ))}
            {cells.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} aria-hidden className="aspect-square" />;
              const departure = getDeparture(current.year, current.month, day);
              const marked = departure.portoSeguro || departure.pernambuco;
              const label = [
                departure.portoSeguro ? "Porto Seguro" : "",
                departure.pernambuco ? "Porto de Galinhas e Recife" : "",
              ].filter(Boolean).join("; ");

              return (
                <div
                  key={day}
                  title={label || undefined}
                  aria-label={marked ? `${day}: saída para ${label}` : `${day}: sem saída anunciada`}
                  className={cn(
                    "relative grid aspect-square min-w-0 place-items-center border text-sm transition-colors sm:text-base",
                    departure.pernambuco
                      ? "border-gold bg-cream font-bold text-primary-foreground"
                      : departure.portoSeguro
                        ? "border-gold bg-gold font-bold text-primary-foreground"
                        : "border-line bg-ink/45 text-muted-foreground",
                  )}
                >
                  {day}
                  {departure.portoSeguro && departure.pernambuco && (
                    <span className="absolute right-1 bottom-1 h-1.5 w-1.5 rounded-full bg-ink" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}