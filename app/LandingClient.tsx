"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import ChecklistForm from "@/components/ChecklistForm";
import ReviewBadges from "@/components/ReviewBadges";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import HeroVideo from "@/components/HeroVideo";
import FadeInSection from "@/components/FadeInSection";
import StickyCTA from "@/components/StickyCTA";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  QrCode,
  ShieldCheck,
  Users,
  Mail,
  UserPlus,
  Printer,
  FileDown,
  Building,
  TrendingUp,
  TrendingDown,
  Code,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Camera,
  ListChecks,
  Zap,
  Wrench,
  Package,
  Truck,
  Factory,
  Building2,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Timer,
  Clock,
  GitBranch,
  ChevronRight,
  Play,
  Star,
  BadgeCheck,
  Lock,
  Flame,
  Shield,
  Globe,
  CheckSquare,
  XCircle,
  ChevronDown,
  Sparkles,
  Download,
  HardHat,
  Warehouse,
  BarChart3,
  MousePointer2,
} from "lucide-react";

interface LandingClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    heroBadge: "No sales calls. No per-site fees. Setup in 3 minutes.",
    heroTitle: "Stop losing visitor logs",
    heroTitleGradient: "across 20 sites",
    heroSubtitle:
      "Paper logs get lost. Spreadsheets get messy. Compliance audits turn into nightmares. SiteSafe replaces all of it with one real-time dashboard — flat $49/mo, up to 20 sites.",
    tryDemo: "Try Live Demo",
    startTrial: "Start Free Trial",
    noCreditCard: "No credit card",
    cancelIn2Clicks: "Cancel in 2 clicks",
    setupIn3Min: "3-min setup",
    trustedBy: "Trusted by multi-site teams",
    rating: "4.9/5 on G2",
    liveActivity: "2,847 check-ins processed today",
    oldWayTitle: "The old way",
    oldWayItems: [
      "Hunting down 6 different logbooks at month-end",
      "Missing visitor photos when security needs them",
      "Reconstructing sign-in sheets for the auditor",
      "No way to know if a blocked visitor tried to enter",
      "Paying per-site fees that multiply every month",
    ],
    newWayTitle: "The SiteSafe way",
    newWayItems: [
      "One dashboard. Every site. One export button.",
      "Visitor photos attached to every record, automatically",
      "Audit-ready PDFs with timestamps and signatures",
      "Instant alerts when a blocked visitor attempts check-in",
      "Flat $49/mo. Add sites 2 through 20 at no extra cost.",
    ],
    featuresTitle: "Everything you need to run visitor management at scale",
    featuresSubtitle:
      "Not feature bloat. Just the tools that keep your sites secure, compliant, and efficient.",
    worksWith: "Works with your existing stack",
    seeInAction: "See it in action",
    demoSubtitle:
      "Watch how SiteSafe replaces paper logs across multiple sites in under 3 minutes.",
    demoFooter: "3-minute demo • No sales calls • Try it free",
    testimonialsTitle: "Teams that switched never looked back",
    pricingTitle: "One price. No surprises.",
    pricingSubtitle:
      "Most visitor management tools charge per site. We think that is unfair to multi-location teams.",
    flatRate: "Flat monthly rate",
    price: "$49",
    pricePeriod: "/mo",
    pricingDesc:
      "Up to 20 sites. Unlimited visitors. All compliance and security features included.",
    pricingFeatures: [
      "Unlimited visitors across all sites",
      "QR codes for every location",
      "Photo capture & badge printing",
      "Audit exports (CSV, Excel, PDF)",
      "Watchlist & lockdown mode",
      "Digital document signing",
      "REST API & webhooks",
      "Live chat support (< 60 sec response)",
    ],
    startTrialCta: "Start my free 14-day trial",
    noCardRequired: "No credit card required. Cancel anytime.",
    builtFor: "Built for multi-site teams",
    auditCtaTitle: "Is your visitor log audit-ready?",
    auditCtaDesc:
      "Most teams fail compliance checks because of gaps they do not know exist. Run our 60-second self-audit and see exactly where you stand.",
    runAudit: "Run the free audit",
    faqTitle: "Questions? No sales call needed.",
    finalCtaTitle: "Start your 14-day free trial today",
    finalCtaDesc:
      "Join teams that replaced paper logs across 20 sites in one afternoon. No credit card. No sales call. No catch.",
    setupFooter: "Setup takes 3 minutes. Cancel in 2 clicks.",
    privacy: "Privacy",
    terms: "Terms",
    signIn: "Sign in",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    outcomeGroups: [
      {
        outcome: "Know who is on every site — instantly",
        items: [
          { title: "QR check-in", desc: "Visitors scan, sign, and get cleared in under 10 seconds. No app download needed." },
          { title: "Photo capture", desc: "Auto-capture visitor photos at sign-in. Security knows exactly who is on site." },
          { title: "Mandatory safety briefings", desc: "Visitors must acknowledge hazards before entry. Compliance proof is automatic." },
        ],
      },
      {
        outcome: "Stop unwanted access before it happens",
        items: [
          { title: "Pre-screening questions", desc: "Block visitors who answer yes to risk questions before they reach your door." },
          { title: "Watchlist & blocklist", desc: "Flagged visitors are stopped at check-in. You get an instant alert." },
          { title: "Lockdown mode", desc: "One click blocks all new check-ins. Active visitors are flagged for security." },
        ],
      },
      {
        outcome: "Pass audits without the panic",
        items: [
          { title: "One-click exports", desc: "CSV, Excel, or PDF filtered by date, site, or host. Includes every pre-screening answer." },
          { title: "Digital document signing", desc: "NDAs and waivers signed before entry. Stored forever for audit." },
          { title: "Emergency evacuation list", desc: "Instant PDF of everyone on site. For drills and real emergencies." },
        ],
      },
      {
        outcome: "Manage 20 sites without 20 logins",
        items: [
          { title: "One account, 20 sites", desc: "Each site gets its own QR code, settings, and visitor log. Switch in one click." },
          { title: "Host notifications", desc: "Visitor selects their host. Brevo sends an alert before they reach the desk." },
          { title: "Pre-registration", desc: "Add expected visitors for one-tap sign-in. No delays at the front desk." },
          { title: "Badge printing", desc: "Print photo badges from the active list. Professional and secure." },
        ],
      },
    ],
    integrations: [
      { title: "REST API", desc: "Connect to Slack, HR tools, or your own dashboard." },
      { title: "Webhooks", desc: "Real-time event streaming to your own tools." },
      { title: "Zapier, Google Sheets, Slack", desc: "No-code integrations that work in minutes." },
    ],
    testimonials: [
      {
        quote: "We replaced paper logs across 8 sites in one afternoon. The safety inspector actually complimented our records.",
        author: "Marcus Chen",
        role: "Facilities Director, Coastal Build Group",
        metric: "8 sites",
        metricLabel: "migrated in 1 day",
      },
      {
        quote: "The lockdown feature alone is worth it. We tested it during a drill and had a full evacuation list in 12 seconds.",
        author: "Sarah Okafor",
        role: "Head of Security, Meridian Health",
        metric: "12 sec",
        metricLabel: "evacuation list",
      },
      {
        quote: "I used to chase down 6 different logbooks at month-end. Now I export one CSV and I am done.",
        author: "David Park",
        role: "Operations Manager, Apex Logistics",
        metric: "6 hrs",
        metricLabel: "saved per month",
      },
    ],
    objections: [
      { q: "What if we have more than 20 sites?", a: "Contact us for enterprise pricing. Most teams under 20 sites never need to talk to sales." },
      { q: "Do visitors need to download an app?", a: "No. They scan a QR code with their phone camera and check in through their browser." },
      { q: "Can we try it without a credit card?", a: "Yes. The 14-day trial starts instantly. No card, no sales call, no catch." },
      { q: "How long does setup take?", a: "Most teams are live in under 3 minutes. Create a site, load the check-in page on any tablet at reception, or print a QR code for visitors to scan with their own phones." },
      { q: "Is our data secure?", a: "All data is encrypted at rest and in transit. SSL encryption." },
    ],
    industries: ["Construction", "Warehousing", "Offices", "Manufacturing", "Logistics"],
    // NEW SECTIONS
    useCases: {
      title: "Built for your environment",
      subtitle: "One platform. Every industry.",
      construction: {
        title: "Construction Sites",
        pain: "Safety audits require complete visitor logs at every gate. Paper gets lost, wet, or illegible. Compliance officers flag incomplete records.",
        solution: "QR codes at each entrance. Workers and inspectors check in with their phone. Audit report exports in 10 seconds with full timestamps and safety acknowledgments.",
        stat: "3-year retention",
        statLabel: "Automatic compliance",
      },
      warehouse: {
        title: "Warehouses & Logistics",
        pain: "Truck drivers, contractors, and auditors visit daily. Paper logs create bottlenecks at the gate and offer zero visibility into who is on the floor.",
        solution: "Self-service check-in for drivers and contractors. Real-time dashboard shows every person on-site. Instant alerts for flagged visitors.",
        stat: "Zero bottlenecks",
        statLabel: "At the gate",
      },
      manufacturing: {
        title: "Manufacturing Plants",
        pain: "OSHA and internal safety audits demand precise visitor tracking. Paper logs fail under scrutiny and cannot prove safety briefings occurred.",
        solution: "Mandatory digital safety acknowledgments before entry. Complete audit trail with photos, timestamps, and host records. One-click export for inspectors.",
        stat: "100% audit-ready",
        statLabel: "Every inspection",
      },
    },
    howItWorks: {
      title: "From zero to check-in in 10 minutes",
      steps: [
        { number: "01", title: "Create your account", desc: "Sign up in 60 seconds. No credit card required for the 14-day trial." },
        { number: "02", title: "Add your locations", desc: "Upload your sites, offices, or warehouses. Each gets its own QR code and settings." },
        { number: "03", title: "Print & post QR codes", desc: "Generate high-res QR codes for doors, gates, or reception desks. Visitors scan and go." },
        { number: "04", title: "Monitor & export", desc: "Watch real-time check-ins from your dashboard. Export audit reports whenever you need them." },
      ],
    },
    stats: {
      title: "Built for teams that take compliance seriously",
      items: [
        { value: 10, suffix: "s", label: "Audit report export", prefix: "" },
        { value: 14, suffix: " days", label: "Free trial", prefix: "" },
        { value: 99, suffix: "%", label: "Uptime SLA", prefix: "" },
        { value: 49, suffix: "/mo", label: "Starting price", prefix: "$" },
      ],
    },
    roiCalculator: {
      title: "See what you’ll save",
      subtitle: "Most teams overpay for visitor management. One flat fee covers all your locations.",
      locationsLabel: "Locations",
      paperCost: "Paper & Manual",
      competitorCost: "Enterprise VMS",
      sitesafeCost: "SiteSafe",
      perMonth: "/month",
      annualSavings: "Annual savings vs. enterprise",
    },
  },
  pt: {
    heroBadge: "Sem ligacoes de vendas. Sem taxas por local. Configuracao em 3 minutos.",
    heroTitle: "Pare de perder registros de visitantes",
    heroTitleGradient: "em 20 locais",
    heroSubtitle:
      "Registros em papel se perdem. Planilhas ficam confusas. Auditorias de compliance viram pesadelos. A SiteSafe substitui tudo isso por um painel em tempo real — R$249/mes fixo, ate 20 locais.",
    tryDemo: "Experimentar Demonstracao",
    startTrial: "Comecar Teste Gratis",
    noCreditCard: "Sem cartao de credito",
    cancelIn2Clicks: "Cancele em 2 cliques",
    setupIn3Min: "Configuracao em 3 min",
    trustedBy: "Confiado por equipes multi-local",
    rating: "4.9/5 no G2",
    liveActivity: "2.847 check-ins processados hoje",
    oldWayTitle: "O jeito antigo",
    oldWayItems: [
      "Cacar 6 registros diferentes no fim do mes",
      "Fotos de visitantes faltando quando a seguranca precisa",
      "Reconstruir fichas de entrada para o auditor",
      "Sem saber se um visitante bloqueado tentou entrar",
      "Pagar taxas por local que multiplicam todo mes",
    ],
    newWayTitle: "O jeito SiteSafe",
    newWayItems: [
      "Um painel. Todos os locais. Um botao de exportacao.",
      "Fotos de visitantes anexadas a cada registro, automaticamente",
      "PDFs prontos para auditoria com timestamps e assinaturas",
      "Alertas instantaneos quando um visitante bloqueado tenta check-in",
      "R$249/mes fixo. Adicione locais 2 a 20 sem custo extra.",
    ],
    featuresTitle: "Tudo que voce precisa para gerenciar visitantes em escala",
    featuresSubtitle:
      "Sem excesso de funcionalidades. Apenas as ferramentas que mantem seus locais seguros, em compliance e eficientes.",
    worksWith: "Funciona com sua stack existente",
    seeInAction: "Veja em acao",
    demoSubtitle:
      "Assista como a SiteSafe substitui registros em papel em multiplos locais em menos de 3 minutos.",
    demoFooter: "Demo de 3 min • Sem ligacoes de vendas • Teste gratis",
    testimonialsTitle: "Equipes que mudaram nunca voltaram atras",
    pricingTitle: "Um preco. Sem surpresas.",
    pricingSubtitle:
      "A maioria das ferramentas cobra por local. Achamos isso injusto para equipes multi-local.",
    flatRate: "Preco mensal fixo",
    price: "R$249",
    pricePeriod: "/mes",
    pricingDesc:
      "Ate 20 locais. Visitantes ilimitados. Todos os recursos de compliance e seguranca inclusos.",
    pricingFeatures: [
      "Visitantes ilimitados em todos os locais",
      "QR codes para cada local",
      "Captura de foto e impressao de cracha",
      "Exportacoes de auditoria (CSV, Excel, PDF)",
      "Lista de bloqueio e modo lockdown",
      "Assinatura digital de documentos",
      "API REST e webhooks",
      "Suporte por chat (< 60 seg de resposta)",
    ],
    startTrialCta: "Comecar meu teste gratis de 14 dias",
    noCardRequired: "Sem cartao de credito. Cancele quando quiser.",
    builtFor: "Feito para equipes multi-local",
    auditCtaTitle: "Seu registro de visitantes esta pronto para auditoria?",
    auditCtaDesc:
      "A maioria das equipes falha em auditorias de compliance por lacunas que nao sabem que existem. Faca nossa auto-auditoria de 60 segundos e veja exatamente onde voce esta.",
    runAudit: "Fazer a auditoria gratuita",
    faqTitle: "Duvidas? Sem ligacao de vendas necessaria.",
    finalCtaTitle: "Comece seu teste gratis de 14 dias hoje",
    finalCtaDesc:
      "Junte-se a equipes que substituiram registros em papel em 20 locais em uma tarde. Sem cartao de credito. Sem ligacao de vendas. Sem pegadinhas.",
    setupFooter: "Configuracao em 3 minutos. Cancele em 2 cliques.",
    privacy: "Privacidade",
    terms: "Termos",
    signIn: "Entrar",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    outcomeGroups: [
      {
        outcome: "Saiba quem esta em cada local — instantaneamente",
        items: [
          { title: "Check-in por QR", desc: "Visitantes escaneiam, assinam e sao liberados em menos de 10 segundos. Sem download de app." },
          { title: "Captura de foto", desc: "Captura automatica de fotos de visitantes na entrada. A seguranca sabe exatamente quem esta no local." },
          { title: "Briefings de seguranca obrigatorios", desc: "Visitantes devem reconhecer riscos antes da entrada. A prova de compliance e automatica." },
        ],
      },
      {
        outcome: "Impeca acesso indesejado antes que aconteca",
        items: [
          { title: "Perguntas de pre-triagem", desc: "Bloqueie visitantes que respondem sim a perguntas de risco antes de chegarem a sua porta." },
          { title: "Lista de monitoramento e bloqueio", desc: "Visitantes sinalizados sao impedidos no check-in. Voce recebe um alerta instantaneo." },
          { title: "Modo lockdown", desc: "Um clique bloqueia todos os novos check-ins. Visitantes ativos sao sinalizados para seguranca." },
        ],
      },
      {
        outcome: "Passe em auditorias sem panico",
        items: [
          { title: "Exportacoes em um clique", desc: "CSV, Excel ou PDF filtrados por data, local ou anfitriao. Inclui todas as respostas de pre-triagem." },
          { title: "Assinatura digital de documentos", desc: "NDAs e termos assinados antes da entrada. Armazenados para sempre para auditoria." },
          { title: "Lista de evacuacao de emergencia", desc: "PDF instantaneo de todos no local. Para treinamentos e emergencias reais." },
        ],
      },
      {
        outcome: "Gerencie 20 locais sem 20 logins",
        items: [
          { title: "Uma conta, 20 locais", desc: "Cada local recebe seu proprio QR code, configuracoes e registro de visitantes. Alterne em um clique." },
          { title: "Notificacoes aos anfitrioes", desc: "O visitante seleciona seu anfitriao. A Brevo envia um alerta antes de chegarem a recepcao." },
          { title: "Pre-cadastro", desc: "Adicione visitantes esperados para check-in com um toque. Sem atrasos na recepcao." },
          { title: "Impressao de cracha", desc: "Imprima crachas com foto da lista ativa. Profissional e seguro." },
        ],
      },
    ],
    integrations: [
      { title: "API REST", desc: "Conecte ao Slack, ferramentas de RH ou seu proprio painel." },
      { title: "Webhooks", desc: "Streaming de eventos em tempo real para suas proprias ferramentas." },
      { title: "Zapier, Google Sheets, Slack", desc: "Integracoes no-code que funcionam em minutos." },
    ],
    testimonials: [
      {
        quote: "Substituimos registros em papel em 8 locais em uma tarde. O inspetor de seguranca ate elogiou nossos registros.",
        author: "Marcus Chen",
        role: "Diretor de Facilities, Coastal Build Group",
        metric: "8 locais",
        metricLabel: "migrados em 1 dia",
      },
      {
        quote: "O modo lockdown sozinho ja vale a pena. Testamos durante um treinamento e tivemos uma lista completa de evacuacao em 12 segundos.",
        author: "Sarah Okafor",
        role: "Chefe de Seguranca, Meridian Health",
        metric: "12 seg",
        metricLabel: "lista de evacuacao",
      },
      {
        quote: "Eu costumava cacar 6 registros diferentes no fim do mes. Agora exporto um CSV e acabei.",
        author: "David Park",
        role: "Gerente de Operacoes, Apex Logistics",
        metric: "6 hrs",
        metricLabel: "economizados por mes",
      },
    ],
    objections: [
      { q: "E se tivermos mais de 20 locais?", a: "Entre em contato para precos enterprise. A maioria das equipes com menos de 20 locais nunca precisa falar com vendas." },
      { q: "Os visitantes precisam baixar um app?", a: "Nao. Eles escaneiam um QR code com a camera do celular e fazem check-in pelo navegador." },
      { q: "Podemos testar sem cartao de credito?", a: "Sim. O teste de 14 dias comeca instantaneamente. Sem cartao, sem ligacao de vendas, sem pegadinha." },
      { q: "Quanto tempo leva a configuracao?", a: "A maioria das equipes esta online em menos de 3 minutos. Crie um local, carregue a pagina de check-in em qualquer tablet na recepcao, ou imprima um QR code para os visitantes escanearem com os proprios celulares." },
      { q: "Nossos dados estao seguros?", a: "Todos os dados sao criptografados em repouso e em transito. Criptografia SSL." },
    ],
    industries: ["Construcao", "Armazenagem", "Escritorios", "Manufatura", "Logistica"],
    // NEW SECTIONS
    useCases: {
      title: "Feito para seu ambiente",
      subtitle: "Uma plataforma. Toda industria.",
      construction: {
        title: "Canteiros de Obras",
        pain: "Auditorias de seguranca exigem registros completos de visitantes em cada portao. O papel se perde, molha ou fica ilegivel. Fiscais de compliance sinalizam registros incompletos.",
        solution: "QR codes em cada entrada. Trabalhadores e inspetores fazem check-in pelo celular. Relatorio de auditoria exporta em 10 segundos com timestamps completos e reconhecimentos de seguranca.",
        stat: "Retencao de 3 anos",
        statLabel: "Compliance automatico",
      },
      warehouse: {
        title: "Armazens e Logistica",
        pain: "Motoristas, contratados e auditores visitam diariamente. Registros em papel criam gargalos no portao e oferecem zero visibilidade de quem esta no piso.",
        solution: "Check-in automatico para motoristas e contratados. Painel em tempo real mostra cada pessoa no local. Alertas instantaneos para visitantes sinalizados.",
        stat: "Zero gargalos",
        statLabel: "No portao",
      },
      manufacturing: {
        title: "Fabricas e Industria",
        pain: "Auditorias internas e de seguranca exigem rastreamento preciso de visitantes. Registros em papel falham sob escrutinio e nao podem provar que briefings ocorreram.",
        solution: "Reconhecimentos digitais de seguranca obrigatorios antes da entrada. Trilha de auditoria completa com fotos, timestamps e registros de anfitrioes. Exportacao em um clique para inspetores.",
        stat: "100% pronto para auditoria",
        statLabel: "Toda inspecao",
      },
    },
    howItWorks: {
      title: "De zero a check-in em 10 minutos",
      steps: [
        { number: "01", title: "Crie sua conta", desc: "Cadastre-se em 60 segundos. Sem cartao de credito para o teste de 14 dias." },
        { number: "02", title: "Adicione seus locais", desc: "Cadastre seus sites, escritorios ou armazens. Cada um recebe seu proprio QR code e configuracoes." },
        { number: "03", title: "Imprima e cole QR codes", desc: "Gere QR codes em alta resolucao para portas, portoes ou recepcoes. Visitantes escaneiam e pronto." },
        { number: "04", title: "Monitore e exporte", desc: "Acompanhe check-ins em tempo real no painel. Exporte relatorios de auditoria sempre que precisar." },
      ],
    },
    stats: {
      title: "Feito para equipes que levam compliance a serio",
      items: [
        { value: 10, suffix: "s", label: "Exportacao de relatorio", prefix: "" },
        { value: 14, suffix: " dias", label: "Teste gratis", prefix: "" },
        { value: 99, suffix: "%", label: "SLA de uptime", prefix: "" },
        { value: 249, suffix: "/mes", label: "Preco inicial", prefix: "R$" },
      ],
    },
    roiCalculator: {
      title: "Veja quanto voce vai economizar",
      subtitle: "A maioria das equipes paga demais por gestao de visitantes. Uma taxa unica cobre todos os seus locais.",
      locationsLabel: "Locais",
      paperCost: "Papel e Manual",
      competitorCost: "VMS Enterprise",
      sitesafeCost: "SiteSafe",
      perMonth: "/mes",
      annualSavings: "Economia anual vs. enterprise",
    },
  },
};

const outcomeIcons = [
  [Users, ShieldAlert, FileText, Building],
  [QrCode, Camera, ShieldCheck],
  [ListChecks, ShieldAlert, Lock],
  [FileDown, FileText, AlertTriangle],
  [Building, Mail, UserPlus, Printer],
];

const integrationIcons = [Code, Zap, GitBranch];

const industryIcons = [Wrench, Package, Building2, Factory, Truck];


/* ───────────────────────────────────────────────
   ANIMATED COMPONENTS
   ─────────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(easeOut * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ───────────────────────────────────────────────
   HERO FLOATING CARDS
   ─────────────────────────────────────────────── */

function FloatingCards({ locale }: { locale: "en" | "pt" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative w-full max-w-lg h-[400px] hidden lg:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* Card 1 — QR Code Check-in */}
      <motion.div
        className="absolute top-4 left-0 w-64 rounded-2xl p-5 border border-white/10 shadow-2xl"
        style={{ rotateX, rotateY, z: 30, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center">
            <QrCode className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{locale === "pt" ? "Check-In" : "Check-In"}</p>
            <p className="text-xs text-slate-400">{locale === "pt" ? "Portal do Visitante" : "Visitor Portal"}</p>
          </div>
        </div>
        <div className="w-full h-28 bg-white rounded-xl flex items-center justify-center">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${i % 3 === 0 || i % 7 === 0 ? "bg-slate-900" : "bg-white"}`} />
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">{locale === "pt" ? "Escaneie para fazer check-in" : "Scan to sign in securely"}</p>
      </motion.div>

      {/* Card 2 — Dashboard */}
      <motion.div
        className="absolute top-20 right-0 w-72 rounded-2xl p-5 border border-white/10 shadow-2xl"
        style={{ rotateX, rotateY, z: 50, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Superadmin</p>
              <p className="text-xs text-slate-400">{locale === "pt" ? "Painel ao Vivo" : "Live Dashboard"}</p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">Live</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">{locale === "pt" ? "Visitantes Hoje" : "Today’s Visitors"}</span>
            <span className="text-sm font-bold text-white">47</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs text-slate-400">{locale === "pt" ? "Locais Ativos" : "Active Locations"}</span>
            <span className="text-sm font-bold text-white">12</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Card 3 — Audit Report */}
      <motion.div
        className="absolute bottom-4 left-12 w-64 rounded-2xl p-5 border border-white/10 shadow-2xl"
        style={{ rotateX, rotateY, z: 40, background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{locale === "pt" ? "Relatorio de Auditoria" : "Audit Report"}</p>
            <p className="text-xs text-slate-400">{locale === "pt" ? "Pronto para Exportar" : "Export Ready"}</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            locale === "pt" ? "Registro de Visitantes" : "Visitor Log",
            locale === "pt" ? "Reconhecimentos de Seguranca" : "Safety Acknowledgments",
            locale === "pt" ? "Registros de Anfitriao" : "Host Records",
            locale === "pt" ? "Verificacao de Timestamp" : "Timestamp Verification",
          ].map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-300">{item}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-4 flex items-center gap-2 text-xs text-sky-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{locale === "pt" ? "PDF exportado em 0.4s" : "PDF exported in 0.4s"}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   TRUST TICKER
   ─────────────────────────────────────────────── */

function TrustTicker({ locale }: { locale: "en" | "pt" }) {
  const industries = locale === "pt"
    ? [
        { icon: Wrench, label: "Construcao" },
        { icon: Building2, label: "Escritorios" },
        { icon: Package, label: "Armazenagem" },
        { icon: Factory, label: "Manufatura" },
        { icon: Truck, label: "Logistica" },
        { icon: Shield, label: "Seguranca" },
      ]
    : [
        { icon: Wrench, label: "Construction" },
        { icon: Building2, label: "Offices" },
        { icon: Package, label: "Warehousing" },
        { icon: Factory, label: "Manufacturing" },
        { icon: Truck, label: "Logistics" },
        { icon: Shield, label: "Security" },
      ];

  return (
    <div className="relative py-6 border-y border-white/5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0f1c] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0f1c] to-transparent z-10" />
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: [0, -600] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...industries, ...industries, ...industries, ...industries].map((ind, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <ind.icon className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">{ind.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   BEFORE / AFTER SLIDER
   ─────────────────────────────────────────────── */

function BeforeAfterSlider({ locale }: { locale: "en" | "pt" }) {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderValue(percentage);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <p className="text-center text-sm text-slate-500 mb-6">
        {locale === "pt" ? "Arraste para comparar — isso é o que seu auditor vê" : "Drag to compare — this is what your auditor sees"}
      </p>
      <div
        ref={containerRef}
        className="relative h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={(e) => isDragging.current && handleMove(e)}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
        onTouchMove={handleMove}
      >
        {/* After (Digital) */}
        <div className="absolute inset-0 bg-[#151b2b] p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{locale === "pt" ? "REGISTRO DIGITAL" : "DIGITAL VISITOR LOG"}</span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: locale === "pt" ? "Carlos Silva" : "Carlos Silva", company: locale === "pt" ? "ABC Construtora" : "ABC Contractors", time: "08:32", host: locale === "pt" ? "Maria R." : "Maria R." },
              { name: locale === "pt" ? "Ana Pereira" : "Ana Pereira", company: locale === "pt" ? "SafeGuard Inc" : "SafeGuard Inc", time: "09:15", host: locale === "pt" ? "João T." : "João T." },
              { name: locale === "pt" ? "Roberto Lima" : "Roberto Lima", company: locale === "pt" ? "Inspect Ltd" : "Inspect Ltd", time: "10:01", host: locale === "pt" ? "Maria R." : "Maria R." },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b border-white/5">
                <span className="text-white font-medium w-24">{row.name}</span>
                <span className="text-slate-400 w-24">{row.company}</span>
                <span className="text-emerald-400 font-mono">{row.time}</span>
                <span className="text-slate-500 text-xs">{row.host}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>{locale === "pt" ? "Exportacao pronta para auditoria" : "Audit-ready export"}</span>
          </div>
        </div>

        {/* Before (Paper) */}
        <div
          className="absolute inset-0 bg-[#e8e4df] p-5"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-red-600">{locale === "pt" ? "FICHA DE PAPEL" : "PAPER SIGN-IN SHEET"}</span>
          </div>
          <div className="space-y-2.5">
            <div className="h-2.5 bg-red-200/50 rounded w-3/4" />
            <div className="h-2.5 bg-red-200/50 rounded w-1/2" />
            <div className="h-2.5 bg-red-200/50 rounded w-5/6" />
            <div className="h-2.5 bg-red-200/50 rounded w-2/3" />
            <div className="h-2.5 bg-red-200/50 rounded w-4/5" />
          </div>
          <div className="absolute bottom-3 left-3 text-xs text-red-600/80 italic">
            {locale === "pt" ? "Letra ilegivel, sem timestamps, sem busca" : "Illegible handwriting, no timestamps, no search"}
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20"
          style={{ left: `${sliderValue}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-slate-900 -ml-0.5" />
            <ChevronRight className="w-3 h-3 text-slate-900 -ml-1.5 rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   USE CASE TOGGLE
   ─────────────────────────────────────────────── */

function UseCaseToggle({ locale }: { locale: "en" | "pt" }) {
  const [active, setActive] = useState<"construction" | "warehouse" | "manufacturing">("construction");
  const copy = t[locale].useCases;

  const cases = {
    construction: {
      icon: Wrench,
      title: copy.construction.title,
      pain: copy.construction.pain,
      solution: copy.construction.solution,
      stat: copy.construction.stat,
      statLabel: copy.construction.statLabel,
    },
    warehouse: {
      icon: Package,
      title: copy.warehouse.title,
      pain: copy.warehouse.pain,
      solution: copy.warehouse.solution,
      stat: copy.warehouse.stat,
      statLabel: copy.warehouse.statLabel,
    },
    manufacturing: {
      icon: Factory,
      title: copy.manufacturing.title,
      pain: copy.manufacturing.pain,
      solution: copy.manufacturing.solution,
      stat: copy.manufacturing.stat,
      statLabel: copy.manufacturing.statLabel,
    },
  };

  const current = cases[active];
  const Icon = current.icon;

  const labels = locale === "pt"
    ? { construction: "Construcao", warehouse: "Armazenagem", manufacturing: "Manufatura" }
    : { construction: "Construction", warehouse: "Warehousing", manufacturing: "Manufacturing" };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-2 mb-10">
        {(Object.keys(cases) as Array<keyof typeof cases>).map((key) => {
          const CaseIcon = cases[key].icon;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === key
                  ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10"
                  : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06]"
              }`}
            >
              <CaseIcon className="w-4 h-4" />
              <span className="capitalize">{labels[key]}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-8 md:p-10 border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{current.title}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                {locale === "pt" ? "O Problema" : "The Problem"}
              </p>
              <p className="text-slate-300 leading-relaxed">{current.pain}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                {locale === "pt" ? "Solucao SiteSafe" : "SiteSafe Solution"}
              </p>
              <p className="text-slate-300 leading-relaxed">{current.solution}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-white">{current.stat}</p>
              <p className="text-xs text-slate-400">{current.statLabel}</p>
            </div>
            <TrackedCtaLink
              href="/signup"
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/25"
            >
              {locale === "pt" ? "Teste gratis" : "Try it free"}
              <ArrowRight className="w-4 h-4" />
            </TrackedCtaLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────────
   ROI CALCULATOR
   ─────────────────────────────────────────────── */

function ROICalculator({ locale }: { locale: "en" | "pt" }) {
  const [locations, setLocations] = useState(5);
  const copy = t[locale].roiCalculator;
  const paperCost = locations * (locale === "pt" ? 450 : 89);
  const competitorCost = locations * (locale === "pt" ? 1450 : 290);
  const sitesafeCost = locale === "pt" ? 249 : 49;
  const savings = competitorCost - sitesafeCost;
  const annualSavings = savings * 12;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="text-center mb-8">
        <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">{copy.title}</p>
        <h3 className="text-xl font-bold text-white">{copy.subtitle}</h3>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-slate-400">{copy.locationsLabel}</span>
          <span className="text-2xl font-bold text-white">{locations}</span>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={locations}
          onChange={(e) => setLocations(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${(locations / 50) * 100}%, #334155 ${(locations / 50) * 100}%, #334155 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-xs text-slate-400 mb-1">{copy.paperCost}</p>
          <p className="text-lg font-bold text-slate-300">{locale === "pt" ? `R$${paperCost.toLocaleString()}` : `$${paperCost.toLocaleString()}`}</p>
          <p className="text-xs text-slate-500">{copy.perMonth}</p>
          <TrendingDown className="w-4 h-4 text-red-400 mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-xs text-slate-400 mb-1">{copy.competitorCost}</p>
          <p className="text-lg font-bold text-slate-300">{locale === "pt" ? `R$${competitorCost.toLocaleString()}` : `$${competitorCost.toLocaleString()}`}</p>
          <p className="text-xs text-slate-500">{copy.perMonth}</p>
          <TrendingDown className="w-4 h-4 text-amber-400 mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-sky-500/20 rounded-full blur-xl" />
          <p className="text-xs text-sky-400 mb-1">{copy.sitesafeCost}</p>
          <p className="text-lg font-bold text-white">{locale === "pt" ? `R$${sitesafeCost}` : `$${sitesafeCost}`}</p>
          <p className="text-xs text-sky-300/70">{copy.perMonth} {locale === "pt" ? "fixo" : "flat"}</p>
          <TrendingUp className="w-4 h-4 text-emerald-400 mt-2" />
        </div>
      </div>

      <motion.div
        className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
        key={annualSavings}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div>
          <p className="text-xs text-emerald-400 font-medium">{copy.annualSavings}</p>
          <p className="text-xl font-bold text-emerald-400">
            {locale === "pt" ? `R$${annualSavings.toLocaleString()}` : `$${annualSavings.toLocaleString()}`}
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-emerald-400" />
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   FAQ ACCORDION
   ─────────────────────────────────────────────── */

function FAQAccordion({ locale }: { locale: "en" | "pt" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const copy = t[locale].objections;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {copy.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-white/5 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-slate-300 leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}


/* ───────────────────────────────────────────────
   MAIN PAGE
   ─────────────────────────────────────────────── */

export default function LandingClient({ locale }: LandingClientProps) {
  const copy = t[locale];
  const price = locale === "pt" ? "R$249" : "$49";
  const pricePeriod = locale === "pt" ? "/mes" : "/mo";
  const stats = copy.stats;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SiteSafe",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: locale === "pt" ? "Sistema de gestao de visitantes para equipes multi-local." : "Visitor management system for multi-site teams.",
            offers: {
              "@type": "Offer",
              price: locale === "pt" ? "249" : "49",
              priceCurrency: locale === "pt" ? "BRL" : "USD",
              priceValidUntil: "2026-12-31",
              url: "https://sitesafe.thesift.space",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "47",
            },
            url: "https://sitesafe.thesift.space",
          }),
        }}
      />

      <PublicHeader locale={locale} />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <NoiseOverlay />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-sky-500/10 via-cyan-400/10 to-blue-500/10 rounded-full blur-[120px] animate-aurora pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-gradient-to-l from-emerald-500/5 to-transparent rounded-full blur-[100px] animate-aurora pointer-events-none"
          style={{ animationDelay: "4s" }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {copy.heroBadge}
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {copy.heroTitle}{" "}
                <span className="bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  {copy.heroTitleGradient}
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
                {copy.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <TrackedCtaLink
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98] hover:scale-[1.02]"
                >
                  {copy.tryDemo}
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all hover:scale-[1.02]"
                >
                  {copy.startTrial}
                </TrackedCtaLink>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.noCreditCard}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.cancelIn2Clicks}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.setupIn3Min}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs text-emerald-400/80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400/70">{copy.liveActivity}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap items-center justify-start gap-4 text-[10px] text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {locale === "pt" ? "200+ locais" : "200+ sites"}
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-sky-400" />
                    {locale === "pt" ? "Criptografia SSL" : "SSL Encryption"}
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-amber-400" />
                    GDPR / LGPD
                  </span>
                </div>
              </div>
            </motion.div>

            <FloatingCards locale={locale} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <motion.div
              className="w-0.5 h-1.5 bg-white/40 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── TRUST TICKER ─── */}
      <TrustTicker locale={locale} />

      {/* ─── BEFORE/AFTER ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {locale === "pt" ? "Registros em papel sao um risco." : "Paper logs are a liability."}{" "}
              <span className="text-slate-500">
                {locale === "pt" ? "Sua planilha nao e uma estrategia de compliance." : "Your spreadsheet is not a compliance strategy."}
              </span>
            </h2>
          </motion.div>
          <BeforeAfterSlider locale={locale} />
        </div>
      </section>

      {/* ─── USE CASE TOGGLE ─── */}
      <section className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              {copy.useCases.title}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{copy.useCases.subtitle}</h2>
          </motion.div>
          <UseCaseToggle locale={locale} />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {copy.featuresTitle}
            </h2>
            <p className="text-lg text-slate-400">{copy.featuresSubtitle}</p>
          </div>
          <div className="space-y-20">
            {copy.outcomeGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    {(() => {
                      const Icon = outcomeIcons[0][groupIdx];
                      return <Icon className="w-5 h-5 text-sky-400" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-white">{group.outcome}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item, idx) => (
                    <FadeInSection key={idx} delay={idx * 100}>
                      <div className="group h-full rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-sky-500/30 p-6 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
                          {(() => {
                            const Icon = outcomeIcons[groupIdx + 1][idx];
                            return <Icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />;
                          })()}
                        </div>
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 pt-16 border-t border-white/5">
            <h3 className="text-center text-lg font-semibold text-slate-300 mb-8">
              {copy.worksWith}
            </h3>
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {copy.integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.03] hover:border-sky-500/20 hover:bg-white/[0.05] transition-all"
                >
                  {(() => {
                    const Icon = integrationIcons[idx];
                    return <Icon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />;
                  })()}
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              {locale === "pt" ? "Como Funciona" : "How It Works"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{copy.howItWorks.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {copy.howItWorks.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative"
              >
                {i < copy.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
                <div className="text-4xl font-bold text-white/5 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{stats.title}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.items.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROI CALCULATOR ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
              {locale === "pt" ? "Precos" : "Pricing"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{copy.roiCalculator.title}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">{copy.roiCalculator.subtitle}</p>
          </motion.div>
          <ROICalculator locale={locale} />
        </div>
      </section>

      {/* ─── DEMO VIDEO ─── */}
      <section className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{copy.seeInAction}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{copy.demoSubtitle}</p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
            <iframe
              src="https://www.youtube-nocookie.com/embed/ntRt1qVkLgo?si=BmRSpzC4Jeea1uij"
              title="SiteSafe Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">{copy.demoFooter}</p>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{copy.testimonialsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {copy.testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.03] p-8 flex flex-col hover:border-white/10 transition-all">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed flex-grow italic">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-sky-400">{t.metric}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.metricLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{copy.pricingTitle}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">{copy.pricingSubtitle}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden animate-pricing-glow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
            <div className="relative">
              <p className="text-sm text-sky-300 font-medium mb-2 uppercase tracking-wider">{copy.flatRate}</p>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-white">{price}</span>
                <span className="text-xl text-slate-400">{pricePeriod}</span>
              </div>
              <p className="text-slate-300 mb-8 max-w-md mx-auto">{copy.pricingDesc}</p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
                {copy.pricingFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <TrackedCtaLink
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98] hover:scale-[1.02]"
              >
                {copy.startTrialCta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </TrackedCtaLink>
              <p className="mt-3 text-xs text-slate-500">{copy.noCardRequired}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-60">
            <a href="https://saasdb.net" rel="noopener noreferrer" target="_blank">
              <Image src="https://saasdb.net/badge/featured-dark.svg" alt="Featured on SaasDB" width={150} height={56} unoptimized className="h-10 w-auto" />
            </a>
            <a href="https://fazier.com/launches/sitesafe.thesift.space" target="_blank" rel="noopener noreferrer">
              <Image src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={120} height={40} unoptimized className="h-8 w-auto" />
            </a>
            <a href="https://www.saashub.com/sitesafe-by-thesift" target="_blank" rel="noopener noreferrer">
              <Image src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1" alt="SiteSafe by TheSift badge" width={150} height={50} unoptimized className="h-8 w-auto" />
            </a>
            <ReviewBadges />
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            {copy.builtFor}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {copy.industries.map((industry, idx) => (
              <div key={industry} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:border-sky-500/20 hover:bg-white/[0.05] transition-all">
                {(() => {
                  const Icon = industryIcons[idx];
                  return <Icon className="w-4 h-4 text-sky-400" />;
                })()}
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUDIT CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-8 sm:p-12 text-center hover:border-sky-500/30 transition-all">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {copy.auditCtaTitle}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">{copy.auditCtaDesc}</p>
            <Link
              href="/audit"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:bg-sky-500/20 transition-all"
            >
              {copy.runAudit}
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{copy.faqTitle}</h2>
          <FAQAccordion locale={locale} />
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{copy.finalCtaTitle}</h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">{copy.finalCtaDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedCtaLink
              href="/demo"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] active:scale-[0.98] hover:scale-[1.02]"
            >
              {copy.tryDemo}
              <ChevronRight className="ml-2 w-5 h-5" />
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all hover:scale-[1.02]"
            >
              {copy.startTrial}
            </TrackedCtaLink>
          </div>
          <p className="mt-4 text-sm text-slate-500">{copy.setupFooter}</p>
        </div>
      </section>

      <PublicFooter locale={locale} />
      <StickyCTA />
    </div>
  );
}