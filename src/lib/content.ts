/**
 * >>> EDITE AQUI <<<
 *
 * Todo o texto, os destinos, os pacotes e os números da agência ficam neste
 * arquivo. Trocar um preço, um hotel ou uma data aqui já atualiza o site
 * inteiro — não precisa mexer no visual.
 *
 * Os pacotes abaixo são EXEMPLOS (marcados como exemplo no site). Quando os
 * valores reais da Azul Viagens chegarem, substitua os números e apague a
 * flag `example: true` de cada pacote: os selos de exemplo somem sozinhos.
 */

import heroImage from "@/assets/hero-bauru-nordeste.jpg";
import maceioImage from "@/assets/destino-maceio.jpg";
import portoDeGalinhasImage from "@/assets/destino-porto-de-galinhas.jpg";
import portoSeguroImage from "@/assets/destino-porto-seguro.jpg";
import recifeImage from "@/assets/destino-recife.jpg";

/* ------------------------------------------------------------------ *
 * Agência
 * ------------------------------------------------------------------ */

export const AGENCY = {
  name: "Infinity Travel Bauru",
  agent: "Dênis Pádua",
  whatsapp: "5514974025530",
  whatsappDisplay: "(14) 97402-5530",
  instagram: "@infinitytravelbauru",
  instagramUrl: "https://instagram.com/infinitytravelbauru",
  city: "Bauru · SP",
  address: "R. Ver. Joaquim da Silva Martha, 17-9 · Jardim Estoril · Bauru - SP · 17011-170",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Ver.+Joaquim+da+Silva+Martha,+17-9,+Jardim+Estoril,+Bauru+-+SP,+17011-170",
  hours: "Seg. a sex. das 9h às 18h · Sáb. das 9h às 13h",
  operator: "Azul Viagens",
};

/** Monta o link do WhatsApp com a mensagem já escrita. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão de cada pacote. */
export function packageMessage(pkg: Pkg): string {
  return `Olá! Tenho interesse no pacote ${pkg.title} (${pkg.destinationName} – ${pkg.nights} noites, ${pkg.seasonLabel}). Pode me enviar valores e formas de pagamento?`;
}

/** Mensagem genérica de contato. */
export const GENERIC_MESSAGE =
  "Olá! Vim pelo site da Infinity Travel Bauru e quero saber mais sobre os voos para o Nordeste.";

/* ------------------------------------------------------------------ *
 * Temporadas
 * ------------------------------------------------------------------ */

export type SeasonId = "sabados" | "julho2027" | "dezjan";

export const SEASONS: Record<SeasonId, { label: string; short: string; note: string }> = {
  sabados: {
    label: "Sábados até setembro de 2027",
    short: "Sábados",
    note: "Saídas todos os sábados, de agora até setembro de 2027.",
  },
  julho2027: {
    label: "Julho de 2027",
    short: "Julho 2027",
    note: "Férias de julho com voos saindo de Bauru.",
  },
  dezjan: {
    label: "Dezembro e janeiro",
    short: "Dez / Jan",
    note: "Temporada de festas e férias de verão.",
  },
};

/* ------------------------------------------------------------------ *
 * Destinos
 * ------------------------------------------------------------------ */

export type Destination = {
  slug: string;
  name: string;
  state: string;
  image: string;
  imageAlt: string;
  kicker: string;
  schedule: string;
  seasons: SeasonId[];
  badges: string[];
  forWhom: string;
  intro: string;
  highlights: string[];
  tips: string[];
  seoTitle: string;
  seoDescription: string;
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "porto-seguro",
    name: "Porto Seguro",
    state: "Bahia",
    image: portoSeguroImage,
    imageAlt: "Falésias e mar turquoise em Porto Seguro ao entardecer",
    kicker: "O voo fixo da Infinity",
    schedule: "Todo sábado até setembro de 2027 — e temporada de julho de 2027",
    seasons: ["sabados", "julho2027"],
    badges: ["Sábados até set/2027", "Julho 2027"],
    forWhom: "Quem quer praia boa, clima de férias e um pacote que fecha rápido.",
    intro:
      "Porto Seguro é o nosso voo de casa: toda semana tem saída de Bauru no sábado, e o calendário já está aberto até setembro de 2027. Dali você emenda praia, vila de pescadores, passeios de barco e a noite de Arraial d'Ajuda — tudo dentro do mesmo pacote, com passagem e hospedagem juntas.",
    highlights: [
      "Praia de Taperapuan e Rio da Passagem",
      "Centro histórico de Porto Seguro e Passarela do Álcool",
      "Passeio de escuna e dia em Arraial d'Ajuda",
      "Distâncias curtas: o pacote já resolve o transfer",
    ],
    tips: [
      "Sai no sábado, volta no outro sábado: 7 noites fecham a semana inteira.",
      "Protetor solar, chapéu e uma bolsa estanque para o passeio de escuna.",
      "Leve um casaco leve: o vento do mar esfria a noite.",
    ],
    seoTitle: "Porto Seguro saindo de Bauru — voos todo sábado | Infinity Travel",
    seoDescription:
      "Porto Seguro com voo saindo de Bauru todo sábado até setembro de 2027, e temporada de julho de 2027. Pacotes Azul Viagens com passagem, hotel e transfer. Fale com a Infinity Travel Bauru.",
  },
  {
    slug: "maceio",
    name: "Maceió",
    state: "Alagoas",
    image: maceioImage,
    imageAlt: "Mar turquoise e falésias em Maceió no fim de tarde",
    kicker: "Temporada de festas",
    schedule: "03 a 06 de janeiro de 2027",
    seasons: ["dezjan"],
    badges: ["Saídas 03 a 06/01/2027"],
    forWhom: "Quem quer virar o ano na praia e voltar com a semana toda de sol.",
    intro:
      "Maceió entra no nosso calendário com saídas diretas de Bauru nos dias 03, 04, 05 e 06 de janeiro de 2027. Montamos o pacote com a Azul Viagens e cuidamos de tudo entre a saída e o seu retorno.",
    highlights: [
      "Piscinas naturais de Pajuçara na maré baixa",
      "Dia em Maragogi e nos Carros de Bois de São Miguel dos Milagres",
      "Orla de Ponta Verde e Ponta da Pita ao pôr do sol",
      "Réveillon com queima de fogos na orla",
    ],
    tips: [
      "Réveillon esgota primeiro: reserve com a maior antecedência possível.",
      "Passeio de catamarã sai cedo — leve capa de chuva leve e tênis de água.",
      "Reserve um dia livre só para a orla, sem pressa.",
    ],
    seoTitle: "Maceió saindo de Bauru — janeiro de 2027 | Infinity Travel",
    seoDescription:
      "Maceió com voos diretos saindo de Bauru de 03 a 06 de janeiro de 2027. Pacotes Azul Viagens com passagem, hotel e transfer. Atendimento da Infinity Travel Bauru.",
  },
  {
    slug: "portos-de-galinhas",
    name: "Porto de Galinhas",
    state: "Pernambuco",
    image: portoDeGalinhasImage,
    imageAlt: "Piscinas naturais de Porto de Galinhas em águas turquoise",
    kicker: "Temporada de festas",
    schedule: "Dezembro e janeiro",
    seasons: ["dezjan"],
    badges: ["Temporada dez/jan"],
    forWhom: "Família com criança: água morninha, calma e peixinho por todo lado.",
    intro:
      "Porto de Galinhas é o destino que agrada a família inteira: piscinas naturais de água morna, jangada, passeio de buggy e uma vila com ótimos restaurantes. Nas saídas de dezembro e janeiro o voo sai de Bauru e o pacote já vai com hospedagem e transfer.",
    highlights: [
      "Piscinas naturais de Maracaípe e Camboinhas",
      "Passeio de buggy pelas praias do litoral sul",
      "Vila de Porto de Galinhas e a rua principal à noite",
      "Ponta de Maracaípe para ver cavalos-marinhos",
    ],
    tips: [
      "A maré baixa define o passeio de piscina natural — deixe flexível.",
      "Sapatilha de água é essencial nos corais.",
      "Crianças aproveitam mais as praias de águas calmas do lado norte.",
    ],
    seoTitle: "Porto de Galinhas saindo de Bauru — dezembro e janeiro | Infinity Travel",
    seoDescription:
      "Porto de Galinhas com voo saindo de Bauru em dezembro e janeiro. Pacotes Azul Viagens com passagem, pousada e transfer. Fale com a Infinity Travel Bauru.",
  },
  {
    slug: "recife",
    name: "Recife",
    state: "Pernambuco",
    image: recifeImage,
    imageAlt: "Orla de Recife ao anoitecer com barcos e skyline",
    kicker: "Temporada de festas",
    schedule: "Dezembro e janeiro",
    seasons: ["dezjan"],
    badges: ["Temporada dez/jan"],
    forWhom: "Quem quer cidade e praia no mesmo dia, com boa mesa e cultura.",
    intro:
      "Recife combina praia urbana, bairro histórico e a melhor mesa do Nordeste — e ainda fica perto de Olinda e Porto de Galinhas. Nas saídas de dezembro e janeiro, o voo sai de Bauru e o pacote fecha passagem, hotel e transfer de uma vez.",
    highlights: [
      "Praia de Boa Viagem e o calçadão ao entardecer",
      "Recife Antigo, Pátio de São Pedro e Marco Zero",
      "Dia em Olinda e nos museus de cera",
      "Bate-volta a Porto de Galinhas ou Toquinho",
    ],
    tips: [
      "Recife Antigo se percorre a pé: leve sapato confortável.",
      "Reserve uma noite para a comida: buffet de frutos do mar é programa.",
      "Em boa parte das praias, entre no mar só em área com recife protegendo.",
    ],
    seoTitle: "Recife saindo de Bauru — dezembro e janeiro | Infinity Travel",
    seoDescription:
      "Recife com voo saindo de Bauru em dezembro e janeiro. Pacotes Azul Viagens com passagem, hotel e transfer. Atendimento da Infinity Travel Bauru.",
  },
];

export function findDestination(slug: string | undefined): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Pacotes (exemplos)
 * ------------------------------------------------------------------ */

export type Pkg = {
  id: string;
  destinationSlug: string;
  destinationName: string;
  title: string;
  season: SeasonId;
  seasonLabel: string;
  nights: number;
  hotel: string;
  meal: string;
  price: number;
  dates: string;
  includes: string[];
  featured: boolean;
  example: boolean;
};

function pkg(
  input: Omit<Pkg, "destinationName" | "seasonLabel" | "example"> & { example?: boolean },
): Pkg {
  return {
    ...input,
    destinationName:
      findDestination(input.destinationSlug)?.name ?? input.destinationSlug,
    seasonLabel: SEASONS[input.season].label,
    example: input.example ?? true,
  };
}

export const PACKAGES: Pkg[] = [
  pkg({
    id: "ps-sabado-7n",
    destinationSlug: "porto-seguro",
    season: "sabados",
    title: "Porto Seguro em sábado · 7 noites",
    nights: 7,
    hotel: "Vila Aurora Praia Club · 4 estrelas",
    meal: "All inclusive",
    price: 2790,
    dates: "Saída no sábado, retorno no sábado seguinte",
    includes: [
      "Voo Bauru ⇄ Porto Seguro",
      "7 noites com all inclusive",
      "Transfer aeroporto ↔ hotel",
      "Bagagem despachada (conforme tarifa)",
    ],
    featured: true,
  }),
  pkg({
    id: "ps-sabado-5n",
    destinationSlug: "porto-seguro",
    season: "sabados",
    title: "Escapada de sábado · 5 noites",
    nights: 5,
    hotel: "Pousada Maré de Pitinga · 3 estrelas",
    meal: "Café da manhã",
    price: 1990,
    dates: "Sai sábado, volta na quinta",
    includes: [
      "Voo Bauru ⇄ Porto Seguro",
      "5 noites com café da manhã",
      "Transfer aeroporto ↔ hotel",
      "Seguro viagem básico",
    ],
    featured: false,
  }),
  pkg({
    id: "ps-julho-7n",
    destinationSlug: "porto-seguro",
    season: "julho2027",
    title: "Julho 2027 em Porto Seguro · 7 noites",
    nights: 7,
    hotel: "Pousada Sol de Julião · 4 estrelas",
    meal: "Meia pensão",
    price: 3190,
    dates: "Sábados de julho de 2027: 03, 10, 17, 24 e 31",
    includes: [
      "Voo Bauru ⇄ Porto Seguro",
      "7 noites em meia pensão",
      "Transfer aeroporto ↔ hotel",
      "Bagagem despachada (conforme tarifa)",
    ],
    featured: true,
  }),
  pkg({
    id: "ps-julho-familia-10n",
    destinationSlug: "porto-seguro",
    season: "julho2027",
    title: "Férias de julho em família · 10 noites",
    nights: 10,
    hotel: "Vila Aurora Praia Club · 4 estrelas",
    meal: "All inclusive",
    price: 4590,
    dates: "Sábados de julho de 2027, saída dia 03 ou 10",
    includes: [
      "Voo Bauru ⇄ Porto Seguro",
      "10 noites com all inclusive",
      "Transfer aeroporto ↔ hotel",
      "Quarto superior para até 4 pessoas",
    ],
    featured: true,
  }),
  pkg({
    id: "mcz-reveillon-7n",
    destinationSlug: "maceio",
    season: "dezjan",
    title: "Réveillon em Maceió · 7 noites",
    nights: 7,
    hotel: "Praia Resort Sete Coqueiros · 4 estrelas",
    meal: "All inclusive",
    price: 5490,
    dates: "Saídas diretas de Bauru de 03 a 06 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Maceió",
      "7 noites com all inclusive",
      "Ceia de Réveillon e festa do hotel",
      "Transfer aeroporto ↔ hotel",
    ],
    featured: true,
  }),
  pkg({
    id: "mcz-ponte-5n",
    destinationSlug: "maceio",
    season: "dezjan",
    title: "Ponte de janeiro em Maceió · 5 noites",
    nights: 5,
    hotel: "Hotel Orla da Jatiúca · 4 estrelas",
    meal: "Café da manhã",
    price: 3890,
    dates: "Saídas diretas de Bauru de 03 a 06 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Maceió",
      "5 noites com café da manhã",
      "Transfer aeroporto ↔ hotel",
      "Bagagem despachada (conforme tarifa)",
    ],
    featured: false,
  }),
  pkg({
    id: "pg-dezjan-6n",
    destinationSlug: "portos-de-galinhas",
    season: "dezjan",
    title: "Verão em Porto de Galinhas · 6 noites",
    nights: 6,
    hotel: "Pousada Maré de Peixinhos · 4 estrelas",
    meal: "Café da manhã",
    price: 4290,
    dates: "Saídas de Bauru de 03 a 08 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Recife + transfer até Porto de Galinhas",
      "6 noites com café da manhã",
      "Passeio de catamarã às piscinas naturais",
      "Bagagem despachada (conforme tarifa)",
    ],
    featured: true,
  }),
  pkg({
    id: "pg-recesso-7n",
    destinationSlug: "portos-de-galinhas",
    season: "dezjan",
    title: "Recesso em família · 7 noites",
    nights: 7,
    hotel: "Residencial Praia dos Arquitetos · 4 estrelas",
    meal: "Meia pensão",
    price: 4890,
    dates: "Saídas de Bauru de 03 a 08 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Recife + transfer até Porto de Galinhas",
      "7 noites em meia pensão",
      "Buggy com bugueiro credenciado",
      "Transfer aeroporto ↔ hospedagem",
    ],
    featured: false,
  }),
  pkg({
    id: "rec-verao-5n",
    destinationSlug: "recife",
    season: "dezjan",
    title: "Verão em Recife · 5 noites",
    nights: 5,
    hotel: "Atlântico Boa Viagem · 4 estrelas",
    meal: "Café da manhã",
    price: 3690,
    dates: "Saídas de Bauru de 03 a 08 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Recife",
      "5 noites com café da manhã",
      "Transfer aeroporto ↔ hotel",
      "City tour Recife Antigo + Olinda",
    ],
    featured: true,
  }),
  pkg({
    id: "rec-7n",
    destinationSlug: "recife",
    season: "dezjan",
    title: "Recife + Olinda · 7 noites",
    nights: 7,
    hotel: "Atlântico Boa Viagem · 4 estrelas",
    meal: "Meia pensão",
    price: 4390,
    dates: "Saídas de Bauru de 03 a 08 de janeiro de 2027",
    includes: [
      "Voo Bauru ⇄ Recife",
      "7 noites em meia pensão",
      "Transfer aeroporto ↔ hotel",
      "Bate-volta a Porto de Galinhas",
    ],
    featured: false,
  }),
];

export const FEATURED_PACKAGES = PACKAGES.filter((p) => p.featured);

export function packagesOf(slug: string): Pkg[] {
  return PACKAGES.filter((p) => p.destinationSlug === slug);
}

/* ------------------------------------------------------------------ *
 * Calendário
 * ------------------------------------------------------------------ */

export const NEXT_SATURDAYS = [
  "26 de setembro",
  "03 de outubro",
  "10 de outubro",
  "17 de outubro",
  "24 de outubro",
  "31 de outubro",
];

export const JULY_2027_SATURDAYS = ["03", "10", "17", "24", "31"];

/* ------------------------------------------------------------------ *
 * Como funciona / diferenciais / FAQ
 * ------------------------------------------------------------------ */

export const STEPS = [
  {
    n: "01",
    title: "Você escolhe no WhatsApp",
    text: "Conta a data, o destino e quantas pessoas. Em minutos devolvemos as opções que fazem sentido para o seu perfil.",
  },
  {
    n: "02",
    title: "Montamos o pacote com a Azul Viagens",
    text: "Passagem, hotel, refeições e transfer fecham juntos, no mesmo contrato e com o parcelamento da operadora.",
  },
  {
    n: "03",
    title: "Você viaja",
    text: "Emitimos, acompanhamos e ficamos no WhatsApp durante toda a viagem — de Bauru até o check-out.",
  },
];

export const REASONS = [
  {
    title: "Tudo no mesmo pacote",
    text: "Emissão, hospedagem, refeições e transfer num só contrato. Nada de reservar cada coisa em um lugar diferente.",
  },
  {
    title: "Acompanhamento da agência",
    text: "Se o voo muda, avisamos antes. Se o hotel precisa de ajuste, quem resolve é a Infinity, não você no balcão.",
  },
  {
    title: "Atendimento em Bauru",
    text: "Somos daqui. Dá para sentar, tomar um café e fechar o pacote olhando no olho — ou resolver tudo pelo WhatsApp.",
  },
  {
    title: "Parcelamento do pacote",
    text: "O pacote sai com as condições de parcelamento da Azul Viagens, no cartão, e consultamos à vista antes de fechar.",
  },
];

export const FAQ = [
  {
    q: "O que o pacote da Azul Viagens inclui?",
    a: "Passagem aérea saindo de Bauru, hospedagem no regime escolhido (café, meia pensão ou all inclusive) e transfer entre aeroporto e hotel. Passeios extras e despesas pessoais não entram, mas a gente cota junto se você quiser.",
  },
  {
    q: "Bagagem despachada está no preço?",
    a: "Depende da tarifa do voo. Mostramos a franquia de cada opção antes de você fechar, e se precisar de bagagem extra a gente acrescenta no mesmo pacote.",
  },
  {
    q: "Como funciona o transfer?",
    a: "Ele vai no pacote: carro ou van busca você no aeroporto de destino e leva até o hotel, na volta faz o caminho contrário. Em Porto de Galinhas o transfer sai de Recife.",
  },
  {
    q: "Posso viajar com crianças de colo?",
    a: "Sim. Menores precisam de documentação própria e algumas tarifas têm condição diferente — nos diga a idade de cada criança que ajustamos o pacote.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Cartão de crédito nas condições de parcelamento da Azul Viagens, e Pix ou transferência à vista com o valor que estiver valendo na cotação.",
  },
  {
    q: "E se eu precisar remarcar?",
    a: "A remarcação segue as regras da tarifa e do hotel escolhidos. Antes de fechar, explicamos o que pode mudar e o que tem multa, para você decidir com clareza.",
  },
  {
    q: "Os valores do site são o preço final?",
    a: "Não. Eles são exemplos de pacote, para você ter a ordem de grandeza. O valor real depende da data, da disponibilidade e do hotel no momento da cotação.",
  },
];
