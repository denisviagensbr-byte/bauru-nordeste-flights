import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Minus, Plus, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { whatsappLink } from "@/lib/content";
import { cn } from "@/lib/utils";

type DestinationId = "porto-seguro" | "maceio" | "porto-de-galinhas" | "recife";

type DestinationOption = {
  id: DestinationId;
  name: string;
  summary: string;
};

const DESTINATIONS: DestinationOption[] = [
  { id: "porto-seguro", name: "Porto Seguro", summary: "Sábados até setembro de 2027" },
  { id: "maceio", name: "Maceió", summary: "Saídas em janeiro de 2027" },
  { id: "porto-de-galinhas", name: "Porto de Galinhas", summary: "Via Recife em janeiro de 2027" },
  { id: "recife", name: "Recife", summary: "Saídas em janeiro de 2027" },
];

const MONTHS = Array.from({ length: 15 }, (_, index) => {
  const date = new Date(2026, 8 + index, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
});

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MACEIO_DEPARTURES = [3, 4, 5, 6, 8];
const PERNAMBUCO_DEPARTURES = [3, 4, 5, 6, 7, 8];
const MACEIO_RETURNS = [
  "2027-01-07", "2027-01-09", "2027-01-14", "2027-01-16", "2027-01-21",
  "2027-01-23", "2027-01-28", "2027-01-30", "2027-02-04", "2027-02-06",
  "2027-02-11", "2027-02-13",
];
const PERNAMBUCO_RETURNS = [
  "2027-01-09", "2027-01-16", "2027-01-23", "2027-01-30", "2027-02-06", "2027-02-13",
];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parseDate(value)).replace(".", "");
}

function getMonthCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ];
}

function isDeparture(destination: DestinationId, year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  if (destination === "porto-seguro") {
    return date.getDay() === 6 && date >= new Date(2026, 8, 26) && date <= new Date(2027, 8, 25);
  }
  if (year !== 2027 || month !== 0) return false;
  return destination === "maceio"
    ? MACEIO_DEPARTURES.includes(day)
    : PERNAMBUCO_DEPARTURES.includes(day);
}

function isReturn(destination: DestinationId, value: string, departure: string | null) {
  if (!departure || value <= departure) return false;
  if (destination === "porto-seguro") return parseDate(value).getDay() === 6;
  return (destination === "maceio" ? MACEIO_RETURNS : PERNAMBUCO_RETURNS).includes(value);
}

function Counter({ label, value, minimum, onChange }: {
  label: string;
  value: number;
  minimum: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4">
      <span className="text-sm font-medium text-cream">{label}</span>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Diminuir ${label.toLowerCase()}`}
          disabled={value <= minimum}
          onClick={() => onChange(Math.max(minimum, value - 1))}
          className="h-9 w-9 rounded-full border-line-strong bg-ink text-cream hover:border-gold hover:bg-ink-raised hover:text-gold"
        >
          <Minus />
        </Button>
        <output className="w-7 text-center font-display text-2xl text-gold" aria-label={`${value} ${label.toLowerCase()}`}>
          {value}
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Aumentar ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(10, value + 1))}
          disabled={value >= 10}
          className="h-9 w-9 rounded-full border-line-strong bg-ink text-cream hover:border-gold hover:bg-ink-raised hover:text-gold"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export function FlightCalendar() {
  const [destination, setDestination] = useState<DestinationId>("porto-seguro");
  const [monthIndex, setMonthIndex] = useState(0);
  const [departure, setDeparture] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<string[]>([]);

  const current = MONTHS[monthIndex];
  if (!current) return null;

  const selectedDestination = DESTINATIONS.find((item) => item.id === destination) ?? DESTINATIONS[0];
  const cells = getMonthCells(current.year, current.month);
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" })
    .format(new Date(current.year, current.month, 1));

  const message = useMemo(() => {
    if (!departure || !returnDate || !selectedDestination) return "";
    const ages = children > 0
      ? `\nIdades das crianças: ${childAges.map((age) => age || "não informada").join(", ")}`
      : "";
    return `Olá, Dênis! Quero uma cotação para ${selectedDestination.name}, saindo de Bauru.\n\nIda: ${formatDate(departure)}\nVolta: ${formatDate(returnDate)}\nAdultos: ${adults}\nCrianças: ${children}${ages}`;
  }, [adults, childAges, children, departure, returnDate, selectedDestination]);

  function chooseDestination(id: DestinationId) {
    setDestination(id);
    setMonthIndex(id === "porto-seguro" ? 0 : 4);
    setDeparture(null);
    setReturnDate(null);
  }

  function chooseDate(value: string, canDepart: boolean, canReturn: boolean) {
    if (!departure && canDepart) {
      setDeparture(value);
      setReturnDate(null);
      return;
    }
    if (departure && canReturn) {
      setReturnDate(value);
      return;
    }
    if (canDepart) {
      setDeparture(value);
      setReturnDate(null);
    }
  }

  function changeChildren(value: number) {
    setChildren(value);
    setChildAges((currentAges) => Array.from({ length: value }, (_, index) => currentAges[index] ?? ""));
  }

  return (
    <section id="calendario" className="scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Calendário de saídas"
          title="Monte sua viagem"
          lead="Escolha o destino, marque a ida e a volta e informe quem vai viajar."
        />

        <div className="mt-9 grid grid-cols-2 gap-2 lg:grid-cols-4" role="group" aria-label="Escolha o destino">
          {DESTINATIONS.map((item) => {
            const active = destination === item.id;
            return (
              <Button
                key={item.id}
                type="button"
                variant="outline"
                onClick={() => chooseDestination(item.id)}
                aria-pressed={active}
                className={cn(
                  "h-auto min-h-20 whitespace-normal rounded-md border-line bg-ink-soft/60 px-4 py-3 text-left hover:border-gold hover:bg-ink-raised",
                  active && "border-gold bg-gold text-primary-foreground hover:bg-gold-soft",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{item.name}</span>
                  <span className={cn("mt-1 block text-xs font-normal", active ? "text-primary-foreground/75" : "text-muted-foreground")}>
                    {item.summary}
                  </span>
                </span>
                {active && <Check className="h-4 w-4 shrink-0" />}
              </Button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="border border-line-strong bg-ink-soft/60 p-4 sm:p-7">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-line pb-5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Mês anterior"
                disabled={monthIndex === 0}
                onClick={() => setMonthIndex((value) => Math.max(0, value - 1))}
                className="h-10 w-10 border-line bg-ink text-cream hover:border-gold hover:bg-ink-raised hover:text-gold"
              >
                <ChevronLeft />
              </Button>
              <div className="min-w-0 text-center">
                <h3 className="font-display text-2xl capitalize text-cream sm:text-3xl">{monthLabel}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {!departure ? "Selecione a data de ida" : !returnDate ? "Agora selecione a volta" : "Período selecionado"}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Próximo mês"
                disabled={monthIndex === MONTHS.length - 1}
                onClick={() => setMonthIndex((value) => Math.min(MONTHS.length - 1, value + 1))}
                className="h-10 w-10 border-line bg-ink text-cream hover:border-gold hover:bg-ink-raised hover:text-gold"
              >
                <ChevronRight />
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
              {WEEKDAYS.map((day, index) => (
                <div key={`${day}-${index}`} className="pb-2 text-center text-[0.64rem] font-semibold uppercase text-muted-foreground">
                  {day}
                </div>
              ))}
              {cells.map((day, index) => {
                if (day === null) return <div key={`empty-${index}`} aria-hidden className="aspect-square" />;
                const value = isoDate(current.year, current.month, day);
                const canDepart = isDeparture(destination, current.year, current.month, day);
                const canReturn = isReturn(destination, value, departure);
                const selectable = departure ? canReturn || canDepart : canDepart;
                const selected = value === departure || value === returnDate;
                const inRange = Boolean(departure && returnDate && value > departure && value < returnDate);
                const role = value === departure ? "ida" : value === returnDate ? "volta" : canDepart ? "ida disponível" : canReturn ? "volta disponível" : "indisponível";

                return (
                  <Button
                    key={day}
                    type="button"
                    variant="outline"
                    disabled={!selectable}
                    onClick={() => chooseDate(value, canDepart, canReturn)}
                    aria-label={`${day}: ${role}`}
                    className={cn(
                      "relative aspect-square h-auto min-w-0 rounded-sm border-line bg-ink/45 p-0 text-sm text-muted-foreground shadow-none sm:text-base",
                      selectable && "border-line-strong text-cream hover:border-gold hover:bg-ink-raised hover:text-gold",
                      canReturn && departure && "border-gold/50 bg-gold/10 text-gold",
                      inRange && "border-line bg-gold/10 text-cream",
                      selected && "border-gold bg-gold font-bold text-primary-foreground hover:bg-gold-soft hover:text-primary-foreground",
                    )}
                  >
                    {day}
                    {selected && <span className="absolute bottom-1 text-[0.5rem] font-bold uppercase">{value === departure ? "ida" : "volta"}</span>}
                  </Button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-sm bg-gold" /> Selecionado</span>
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-sm border border-gold bg-gold/10" /> Disponível</span>
            </div>
          </div>

          <aside className="border border-line-strong bg-ink-soft/60 p-6 sm:p-7" aria-live="polite">
            <div className="flex items-center gap-3 border-b border-line pb-5">
              <Users className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Sua viagem</p>
                <h3 className="mt-1 font-display text-2xl text-cream">{selectedDestination?.name}</h3>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-4 border-b border-line py-5 text-sm">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Ida</dt>
                <dd className="mt-1 font-medium text-cream">{departure ? formatDate(departure) : "Selecione"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Volta</dt>
                <dd className="mt-1 font-medium text-cream">{returnDate ? formatDate(returnDate) : "Selecione"}</dd>
              </div>
            </dl>

            {departure && returnDate ? (
              <div>
                <Counter label="Adultos" value={adults} minimum={1} onChange={setAdults} />
                <Counter label="Crianças" value={children} minimum={0} onChange={changeChildren} />

                {children > 0 && (
                  <fieldset className="mt-5">
                    <legend className="text-sm font-medium text-cream">Idade das crianças</legend>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {childAges.map((age, index) => (
                        <label key={index} className="text-xs text-muted-foreground">
                          Criança {index + 1}
                          <input
                            type="number"
                            inputMode="numeric"
                            min="0"
                            max="17"
                            value={age}
                            onChange={(event) => setChildAges((ages) => ages.map((item, ageIndex) => ageIndex === index ? event.target.value : item))}
                            placeholder="Idade"
                            className="mt-1.5 h-11 w-full rounded-md border border-line-strong bg-ink px-3 text-base text-cream outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold"
                          />
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <WhatsAppButton href={whatsappLink(message)} className="mt-6 w-full">
                  Solicitar cotação
                </WhatsAppButton>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                  A disponibilidade e os valores serão confirmados pelo Dênis.
                </p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Após escolher a ida e a volta, informe quantos adultos e crianças vão viajar.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}