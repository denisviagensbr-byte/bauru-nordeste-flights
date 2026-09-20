# Landing page — Infinity Travel Bauru (Bauru → Nordeste)

Página de vendas para os voos de Bauru (SP) para o Nordeste, com pacotes Azul Viagens e contato direto pelo WhatsApp.

## Decisões já fechadas

- **Conversão:** WhatsApp direto (botão flutuante + cada pacote abre a conversa com a mensagem pronta).
- **Identidade:** Infinity Travel Bauru — preto e dourado, premium e elegante.
- **Tipografia:** Instrument Serif (títulos) + Work Sans (texto).
- **Conteúdo:** pacotes de exemplo editáveis, claramente marcados como exemplo.

## O que a página precisa comunicar

| Destino | Frequência | Destaque |
| --- | --- | --- |
| Porto Seguro | Todo sábado, o ano todo — e temporada de julho de 2027 | Produto fixo: "sábado é dia de Porto Seguro", com julho/2027 em destaque |
| Maceió | Dezembro e janeiro | Temporada de festas / férias |
| Porto de Galinhas | Dezembro e janeiro | Temporada |
| Recife | Dezembro e janeiro | Temporada |

Todos os voos partem de Bauru. Nada de preço oficial da Azul: a página vende o atendimento da agência e o pacote.

## Estrutura do site

```text
/                    home de vendas (hero, destinos, pacotes, como funciona, FAQ)
/pacotes             catálogo completo com filtro por destino e temporada
/destinos/$slug      uma página por destino (4 páginas: porto-seguro, maceio,
                     portos-de-galinhas, recife) com datas, pacotes e CTA
```

### Home — seções

1. **Abertura** — "De Bauru para o Nordeste, todo sábado." Foto grande, selo "Azul Viagens" e botão "Falar no WhatsApp".
2. **Nossos voos** — 4 cartões: Porto Seguro com os selos "sábados, o ano todo" e "julho 2027"; Maceió, Porto de Galinhas e Recife com selo "temporada dez/jan".
3. **Pacotes em destaque** — 3 a 4 pacotes de exemplo: destino, noites, hotel, o que inclui, "a partir de R$ X" e "parcelamos no cartão". Um deles é Porto Seguro em julho de 2027.
4. **Como funciona** — 3 passos: escolhe no WhatsApp → montamos o pacote com a Azul → você viaja.
5. **Por que fechar com a Infinity** — emissão e hospedagem no mesmo pacote, acompanhamento da agência, atendimento em Bauru.
6. **Calendário 2026/2027** — sábados disponíveis de Porto Seguro, a janela de julho de 2027 (Porto Seguro) e as janelas de dez/jan dos demais.
7. **Dúvidas frequentes** — bagagem, transfer, menores, formas de pagamento, o que o pacote inclui.
8. **Chamada final + rodapé** — WhatsApp, Instagram, cidade, horário de atendimento.

### Página de cada destino

Galeria, para quem é o destino, período e dias de voo, pacotes daquele destino, e um bloco "o que levar / dicas curtas". Na página de Porto Seguro, julho de 2027 tem bloco próprio (datas, pacotes e chamada). Cada uma com título e descrição próprios para Google e WhatsApp.

## Sistema visual

- Fundo preto profundo com superfícies grafite; dourado só em selos, preços e botões (nada de degradê largo).
- Tokens novos em `src/styles.css`: `--ink`, `--ink-soft`, `--gold`, `--gold-soft`, `--cream`, além dos tons de borda e sombra correspondentes. Tudo em `oklch`, registrado no `@theme inline`.
- Títulos em Instrument Serif (peso leve, caixas altas), corpo em Work Sans. Fontes carregadas por `<link>` no `head` de `src/routes/__root.tsx` e ligadas em `@theme`.
- Movimento discreto, sem instalar bibliotecas: entrada suave das seções ao rolar, brilho no botão dourado ao passar o mouse, cartões que levantam levemente.
- Imagens: 5 fotos geradas (uma de abertura e uma por destino) em estilo editorial premium — mar, areia e céu ao entardecer, com o dourado da paleta.

## Dados e WhatsApp

- `src/lib/content.ts`: destinos, temporadas (sábados de Porto Seguro, julho/2027 em Porto Seguro, dez/jan nos demais), pacotes (preço, noites, hotel, refeições, transfer, bagagem, datas, selo) e textos de FAQ — arquivo comentado como "edite aqui" para trocar valores e hotéis sem mexer no visual.
- Mensagem do WhatsApp pré-preenchida por pacote, ex.: *"Olá! Tenho interesse no pacote Porto Seguro – 7 noites, saída em sábado. Pode me enviar valores e formas de pagamento?"*
- Número da agência em uma única constante, usado por todos os botões e pelo botão flutuante.
- Selo "valor de exemplo — sujeito a disponibilidade" em todos os preços, até você enviar os reais.

## Detalhes técnicos

- Rotas TanStack com `head()` próprio em cada página (título, descrição, og:title/og:description) e JSON-LD de agência de viagens na home.
- Sem banco de dados e sem login: tudo estático, então a página carrega rápido e não depende de plano pago.
- Responsivo de verdade: o catálogo vira lista no celular e o botão de WhatsApp fica fixo.

## Como vou conferir

- Compilação sem erro e navegação real nas 6 páginas pelo navegador.
- Prints no desktop e no celular (largura 390) da abertura, dos pacotes e de uma página de destino.
- Clique em um botão de pacote para confirmar que a conversa abre com a mensagem certa.

## O que preciso de você (não bloqueia o início)

1. Número do WhatsApp com DDD e o @ do Instagram.
2. Endereço / bairro em Bauru e horário de atendimento, para o rodapé.
3. Depois: preços, hotéis e datas reais — troco nos dados e os selos de exemplo somem.
