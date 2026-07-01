"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  Code,
  Terminal,
  Key,
  Globe,
  AlertTriangle,
  Mail,
  Zap,
  Lock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

interface DocsClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    home: "Home",
    getApiKey: "Get API key",
    title: "API Documentation",
    subtitle:
      "Integrate SiteSafe with your own tools using our REST API. Bearer token authentication, JSON responses, and webhooks for real-time events.",
    quickStart: "Quick Start",
    step1Title: "1. Get your API key",
    step1Desc: "Generate your company's API key in the",
    settings: "Settings",
    step1Desc2:
      "page of your SiteSafe dashboard. Keys are hashed and scoped to your account.",
    step2Title: "2. Authenticate",
    step2Desc: "Include your key in the Authorization header:",
    step3Title: "3. Base URL",
    endpoints: "Endpoints",
    queryParams: "Query Parameters",
    bodyFields: "Body Fields",
    exampleRequest: "Example Request",
    exampleResponse: "Example Response",
    required: "required",
    optional: "optional",
    errors: "Errors",
    errorsDesc:
      "The API returns standard HTTP status codes. A JSON body with an",
    errorField: "error",
    errorsDesc2: "field is included for failures.",
    webhooks: "Webhooks",
    webhooksDesc:
      "Send real-time events (check-in, check-out, blocklist hits) to any URL. Configure webhook endpoints in your dashboard Settings.",
    getApiAccess: "Get API access",
    support: "Need help?",
    supportDesc:
      "Questions about authentication, rate limits, or custom integrations? We typically respond within 24 hours.",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    endpointsList: [
      {
        method: "GET",
        methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        path: "/sites",
        description: "Returns all sites belonging to your company.",
        example: `curl -H "Authorization: Bearer YOUR_KEY" \\\n     https://sitesafe.thesift.space/api/v1/sites`,
        response: `[\n  {\n    "id": "cmp_abc123",\n    "name": "Headquarters",\n    "slug": "headquarters",\n    "address": "123 Main St",\n    "safetyBriefingText": "Please sign in..."\n  }\n]`,
      },
      {
        method: "GET",
        methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        path: "/visitors",
        description: "Returns visitor logs, optionally filtered by site or date range.",
        params: [
          { name: "siteId", desc: "Filter by site ID" },
          { name: "from", desc: "Start date (YYYY-MM-DD)" },
          { name: "to", desc: "End date (YYYY-MM-DD)" },
        ],
        example: `curl -H "Authorization: Bearer YOUR_KEY" \\\n     "https://sitesafe.thesift.space/api/v1/visitors?from=2026-06-01&to=2026-06-30"`,
      },
      {
        method: "POST",
        methodColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        path: "/visitors",
        description: "Creates a new visitor record (simulates a check-in). The site must belong to your company.",
        body: [
          { name: "fullName", required: true },
          { name: "company", required: true },
          { name: "siteId", required: true },
          { name: "phone", required: false },
          { name: "email", required: false },
          { name: "hostName", required: false },
          { name: "safetyAcknowledged", required: false, type: "boolean" },
        ],
        example: `curl -X POST \\\n  -H "Authorization: Bearer YOUR_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"fullName":"Jane Doe","company":"Acme","siteId":"cmp_abc123"}' \\\n  https://sitesafe.thesift.space/api/v1/visitors`,
      },
      {
        method: "POST",
        methodColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        path: "/visitors/{visitorId}/signout",
        description: "Signs out an existing visitor. The visitor must belong to your company.",
        example: `curl -X POST \\\n  -H "Authorization: Bearer YOUR_KEY" \\\n  https://sitesafe.thesift.space/api/v1/visitors/cmp_abc123/signout`,
      },
    ],
    errorsList: [
      { code: "401", label: "Unauthorized", desc: "Missing or invalid API key" },
      { code: "400", label: "Bad Request", desc: "Missing required fields" },
      { code: "404", label: "Not Found", desc: "Resource not found or access denied" },
      { code: "429", label: "Rate Limited", desc: "Rate limit exceeded (future)" },
    ],
  },
  pt: {
    home: "Início",
    getApiKey: "Obter chave API",
    title: "Documentação da API",
    subtitle:
      "Integre a SiteSafe com suas próprias ferramentas usando nossa API REST. Autenticação por token Bearer, respostas JSON e webhooks para eventos em tempo real.",
    quickStart: "Início Rápido",
    step1Title: "1. Obtenha sua chave API",
    step1Desc: "Gere a chave API da sua empresa na página de",
    settings: "Configurações",
    step1Desc2:
      "do painel SiteSafe. As chaves são criptografadas e vinculadas à sua conta.",
    step2Title: "2. Autentique",
    step2Desc: "Inclua sua chave no cabeçalho Authorization:",
    step3Title: "3. URL Base",
    endpoints: "Endpoints",
    queryParams: "Parâmetros de Consulta",
    bodyFields: "Campos do Body",
    exampleRequest: "Exemplo de Requisição",
    exampleResponse: "Exemplo de Resposta",
    required: "obrigatório",
    optional: "opcional",
    errors: "Erros",
    errorsDesc:
      "A API retorna códigos de status HTTP padrão. Um corpo JSON com um campo",
    errorField: "error",
    errorsDesc2: "é incluído em caso de falhas.",
    webhooks: "Webhooks",
    webhooksDesc:
      "Envie eventos em tempo real (check-in, check-out, detecções na lista de bloqueio) para qualquer URL. Configure endpoints de webhook nas Configurações do painel.",
    getApiAccess: "Obter acesso à API",
    support: "Precisa de ajuda?",
    supportDesc:
      "Dúvidas sobre autenticação, limites de taxa ou integrações personalizadas? Normalmente respondemos em até 24 horas.",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    endpointsList: [
      {
        method: "GET",
        methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        path: "/sites",
        description: "Retorna todos os locais pertencentes à sua empresa.",
        example: `curl -H "Authorization: Bearer SUA_CHAVE" \\\n     https://sitesafe.thesift.space/api/v1/sites`,
        response: `[\n  {\n    "id": "cmp_abc123",\n    "name": "Matriz",\n    "slug": "matriz",\n    "address": "Av. Paulista, 123",\n    "safetyBriefingText": "Por favor, registre-se..."\n  }\n]`,
      },
      {
        method: "GET",
        methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        path: "/visitors",
        description: "Retorna registros de visitantes, opcionalmente filtrados por local ou intervalo de datas.",
        params: [
          { name: "siteId", desc: "Filtrar por ID do local" },
          { name: "from", desc: "Data inicial (AAAA-MM-DD)" },
          { name: "to", desc: "Data final (AAAA-MM-DD)" },
        ],
        example: `curl -H "Authorization: Bearer SUA_CHAVE" \\\n     "https://sitesafe.thesift.space/api/v1/visitors?from=2026-06-01&to=2026-06-30"`,
      },
      {
        method: "POST",
        methodColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        path: "/visitors",
        description: "Cria um novo registro de visitante (simula um check-in). O local deve pertencer à sua empresa.",
        body: [
          { name: "fullName", required: true },
          { name: "company", required: true },
          { name: "siteId", required: true },
          { name: "phone", required: false },
          { name: "email", required: false },
          { name: "hostName", required: false },
          { name: "safetyAcknowledged", required: false, type: "boolean" },
        ],
        example: `curl -X POST \\\n  -H "Authorization: Bearer SUA_CHAVE" \\\n  -H "Content-Type: application/json" \\\n  -d '{"fullName":"Maria Silva","company":"Acme","siteId":"cmp_abc123"}' \\\n  https://sitesafe.thesift.space/api/v1/visitors`,
      },
      {
        method: "POST",
        methodColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        path: "/visitors/{visitorId}/signout",
        description: "Registra a saída de um visitante existente. O visitante deve pertencer à sua empresa.",
        example: `curl -X POST \\\n  -H "Authorization: Bearer SUA_CHAVE" \\\n  https://sitesafe.thesift.space/api/v1/visitors/cmp_abc123/signout`,
      },
    ],
    errorsList: [
      { code: "401", label: "Não autorizado", desc: "Chave API ausente ou inválida" },
      { code: "400", label: "Requisição inválida", desc: "Campos obrigatórios ausentes" },
      { code: "404", label: "Não encontrado", desc: "Recurso não encontrado ou acesso negado" },
      { code: "429", label: "Limite excedido", desc: "Limite de taxa excedido (futuro)" },
    ],
  },
};

export default function DocsClient({ locale }: DocsClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Code className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* ─── Quick Start ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-400" />
              {copy.quickStart}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{copy.step1Title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {copy.step1Desc}{" "}
                    <Link href="/admin/login" className="text-sky-400 hover:text-sky-300 transition-colors">
                      {copy.settings}
                    </Link>{" "}
                    {copy.step1Desc2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{copy.step2Title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {copy.step2Desc}
                  </p>
                  <CodeBlock code={`Authorization: Bearer ss_your_api_key_here`} />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{copy.step3Title}</h3>
                  <CodeBlock code={`https://sitesafe.thesift.space/api/v1`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Endpoints ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            {copy.endpoints}
          </h2>

          <div className="space-y-8">
            {copy.endpointsList.map((ep, i) => (
              <div
                key={i}
                id={ep.path.replace(/\//g, "-").replace(/{|}/g, "")}
                className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden scroll-mt-24"
              >
                <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-mono font-bold uppercase ${ep.methodColor}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-white font-mono">{ep.path}</code>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">{ep.description}</p>

                  {ep.params && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{copy.queryParams}</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {ep.params.map((p, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs">
                            <code className="px-1.5 py-0.5 rounded bg-white/5 text-sky-400 font-mono">{p.name}</code>
                            <span className="text-slate-400">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ep.body && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{copy.bodyFields}</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {ep.body.map((b, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs">
                            <code className={`px-1.5 py-0.5 rounded font-mono ${b.required ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                              {b.name}
                            </code>
                            <span className="text-slate-500">{b.required ? copy.required : copy.optional}{b.type ? ` · ${b.type}` : ""}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{copy.exampleRequest}</h4>
                    <CodeBlock code={ep.example} />
                  </div>

                  {ep.response && (
                    <details className="group">
                      <summary className="flex items-center gap-2 text-xs text-sky-400 cursor-pointer hover:text-sky-300 transition-colors mb-2">
                        <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
                        {copy.exampleResponse}
                      </summary>
                      <CodeBlock code={ep.response} />
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Errors ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            {copy.errors}
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            {copy.errorsDesc} <code className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-xs">{copy.errorField}</code> {copy.errorsDesc2}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.errorsList.map((err, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold flex-shrink-0">
                  {err.code}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{err.label}</p>
                  <p className="text-xs text-slate-400">{err.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Webhooks Teaser ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">{copy.webhooks}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {copy.webhooksDesc}
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                {copy.getApiAccess} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Support ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{copy.support}</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            {copy.supportDesc}
          </p>
          <a
            href="mailto:hello@thesift.space"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@thesift.space
          </a>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}