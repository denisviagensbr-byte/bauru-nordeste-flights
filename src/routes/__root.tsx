import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AGENCY } from "../lib/content";
import { SiteHeader } from "../components/site-header";
import { SiteFooter, WhatsAppFab } from "../components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ink px-5 text-center">
      <span className="font-display text-7xl leading-none text-gold">404</span>
      <h1 className="font-display text-2xl text-cream">Essa página saiu de rota</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        O endereço que você abriu não existe mais. Dá para voltar para o início ou chamar no
        WhatsApp que a gente te leva direto ao pacote certo.
      </p>
      <a
        href="/"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-gold-soft"
      >
        Voltar para o início
      </a>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ink px-5 text-center">
      <span className="font-display text-4xl leading-none text-gold">Infinity</span>
      <h1 className="font-display text-2xl text-cream">Essa tela não carregou</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Algo do nosso lado saiu do lugar. Você pode tentar de novo ou falar com a agência pelo
        WhatsApp enquanto isso.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-gold-soft"
        >
          Tentar de novo
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: AGENCY.name },
      {
        name: "description",
        content:
          "Agência de viagens em Bauru com pacotes Azul Viagens: Porto Seguro aos sábados; Maceió, Porto de Galinhas e Recife em janeiro de 2027.",
      },
      { name: "author", content: AGENCY.name },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: AGENCY.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="bg-ink font-sans text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </QueryClientProvider>
  );
}
