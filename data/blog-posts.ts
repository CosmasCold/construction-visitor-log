export type PostLocale = "en" | "pt" | "both";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  excerpt: string;
  locale: PostLocale;
  ptSlug?: string; // Link to PT version if both
  enSlug?: string; // Link to EN version if both
}

export const posts: BlogPost[] = [
  {
  slug: "custo-auditoria-seguranca-falha",
  title: "O Custo Real de uma Auditoria de Seguranca Falha em 2026",
  date: "2026-07-02",
  lastModified: "2026-07-02",
  excerpt: "Multas NR18, paralisacao de obra, perda de contratos. O custo oculto de nao ter controle de visitantes e maior que voce imagina.",
  locale: "pt" as const,
},
  {
  slug: "check-in-digital-obras",
  title: "Check-in Digital para Obras: Guia Pratico 2026 + Modelo Gratis",
  date: "2026-07-02",
  lastModified: "2026-07-02",
  excerpt: "Como implementar check-in digital em canteiros de obra. QR code, conformidade NR18, seguranca e lista de evacuacao em 5 passos.",
  locale: "pt" as const,
},
  {
  slug: "melhor-sistema-controle-visitantes-2026",
  title: "Melhor Sistema de Controle de Visitantes 2026: Guia Completo + Comparativo",
  date: "2026-07-02",
  lastModified: "2026-07-02",
  excerpt: "Comparativo honesto de 5 soluções: Envoy, SwipedOn, iLobby, SiteSafe e papel. Preços reais, funcionalidades e qual escolher para obras e escritórios no Brasil.",
  locale: "pt" as const,
},
  {
    slug: "visitor-log-book-template-free",
    title: "Free Visitor Log Book Template (PDF) + Why Paper Logs Fail in 2026",
    date: "2026-06-25",
    lastModified: "2026-06-25",
    excerpt:
      "Download a free printable visitor log template. Plus: why 73% of facilities still use paper logs, the hidden risks, and how to replace them in 10 minutes for $49/mo.",
      locale: "en",
  },
  {
    slug: "best-visitor-management-software-2026",
    title: "The 10 Best Visitor Management Software Solutions for 2026: A Buyer’s Guide",
    date: "2026-06-24",
    lastModified: "2026-06-24",
    excerpt:
      "Compare the 10 best visitor management systems of 2026. Real reviews, pricing, and feature breakdowns to help you choose the right VMS for your organization.",
      locale: "en",
  },
  {
    slug: "why-multi-site-visitor-management-breaks-without-standardization",
    title: "Why Multi‑Site Visitor Management Breaks Without Standardization",
    date: "2026-06-22",
    lastModified: "2026-06-22",
    excerpt:
      "Most multi‑site organizations don’t realize their visitor management is broken until an audit. Here’s why fragmentation happens — and how to fix it.",
      locale: "en",
  },
  {
    slug: "ai-powered-visitor-management",
    title: "68% of Facility Managers Are Planning AI-Powered Visitor Management — Are You?",
    date: "2026-06-21",
    lastModified: "2026-06-21",
    excerpt:
      "Facility management is transforming. 68% of facility managers are planning AI-powered visitor management. Discover what’s driving the trend and how to stay ahead.",
      locale: "en",
  },
  {
    slug: "capped-plan-20-sites",
    title: "Why We Capped Our Plan at 20 Sites",
    date: "2026-06-19",
    lastModified: "2026-06-19",
    excerpt:
      "SiteSafe recently changed from unlimited sites to a 20‑site cap on the $49/month plan. Here’s why we made the change and what it means for our customers.",
      locale: "en",
  },
  {
    slug: "visitor-management-for-schools",
    title: "Visitor Management for Schools: What Principals Need to Know",
    date: "2026-06-18",
    lastModified: "2026-06-18",
    excerpt:
      "A practical guide for K‑12 principals on modern visitor management — from photo capture and emergency evacuation lists to watchlist screening and flat pricing.",
      locale: "en",
  },
  {
    slug: "sine-alternative",
    title: "Sine Alternative: Why SiteSafe Is a Better Fit for Compliance‑First Teams",
    date: "2026-06-17",
    lastModified: "2026-06-17",
    excerpt:
      "Sine works for basic check‑in but lacks mandatory safety acknowledgment, watchlist, and emergency features. SiteSafe includes all of that at a flat $49/mo with unlimited sites.",
      locale: "en",
  },
  {
    slug: "pass-osha-audit-visitor-log",
    title: "How to Pass an OSHA Audit with a Visitor Log",
    date: "2026-06-17",
    lastModified: "2026-06-17",
    excerpt:
      "What an OSHA inspector actually checks in your visitor log, the most common failures, and how a digital system makes you audit‑ready in minutes.",
      locale: "en",
  },
  {
    slug: "proxyclick-alternative",
    title: "Proxyclick Alternative: Why SiteSafe Fits Small Teams Better",
    date: "2026-06-17",
    lastModified: "2026-06-17",
    excerpt:
      "Proxyclick is powerful but complex and costly for smaller teams. SiteSafe offers flat $49/mo pricing, mandatory safety briefings, watchlist, and emergency features — all included.",
      locale: "en",
  },
  {
    slug: "traction-guest-alternative",
    title: "Traction Guest Alternative: Why SiteSafe Is a Better Fit for Smaller Teams",
    date: "2026-06-17",
    lastModified: "2026-06-17",
    excerpt:
      "Traction Guest is highly customizable but expensive and slow to deploy. SiteSafe gives small to mid‑sized teams the compliance and security features they need at a flat $49/mo.",
      locale: "en",
  },
  {
    slug: "the-receptionist-alternative",
    title: "The Receptionist Alternative: Why SiteSafe Fits Growing Teams Better",
    date: "2026-06-17",
    lastModified: "2026-06-17",
    excerpt:
      "The Receptionist works for a single office but gets expensive with more sites. SiteSafe offers unlimited sites, watchlist, lockdown, and document signing — all for $49/mo flat.",
      locale: "en",
  },
  {
    slug: "cold-email-failure",
    title: "I Sent 13 Cold Email Campaigns and Got 0 Sign‑ups",
    date: "2026-06-14",
    lastModified: "2026-06-15",
    excerpt:
      "A honest look at what I tried, what failed, and what I learned from reaching out to 200+ site managers about SiteSafe.",
      locale: "en",
  },
  {
    slug: "envoy-alternative",
    title: "Envoy Alternative: Why SiteSafe Is the Better Choice for Small Teams",
    date: "2026-06-13",
    lastModified: "2026-06-17",
    excerpt:
      "Envoy's mandatory demos, per‑site fees, and hidden pricing don't work for small teams. Here's how SiteSafe compares — flat $49/mo, no sales calls, and a mandatory safety acknowledgment Envoy can't match.",
      locale: "en",
  },
  {
    slug: "swipedon-alternative",
    title: "SwipedOn Alternative: Flat Pricing, No Per‑Location Fees",
    date: "2026-06-13",
    lastModified: "2026-06-15",
    excerpt:
      "SwipedOn's per‑location pricing adds up fast. SiteSafe offers unlimited sites for one flat price, plus host notifications and mandatory safety briefings included.",
      locale: "en",
  },
  {
    slug: "ilobby-alternative",
    title: "iLobby Alternative: Simpler Visitor Management for Small Teams",
    date: "2026-06-13",
    lastModified: "2026-06-15",
    excerpt:
      "iLobby is built for enterprises with complex needs. SiteSafe gives small teams fast check‑in, compliance proof, and flat pricing — no long deployment, no sales calls.",
      locale: "en",
  },
  {
    slug: "best-visitor-management-systems",
    title: "The 5 Best Visitor Management Systems for Small Businesses",
    date: "2026-06-13",
    lastModified: "2026-06-15",
    excerpt:
      "Compare Envoy, SwipedOn, iLobby, SiteSafe, and paper logs side‑by‑side on pricing, compliance features, and ease of use. Find the right fit for your workplace.",
      locale: "en",
  },
  {
    slug: "what-inspectors-look-for-in-visitor-log",
    title: "What Inspectors Look for in a Visitor Log",
    date: "2026-06-13",
    lastModified: "2026-06-17",
    excerpt:
      "From mandatory safety acknowledgments to time‑stamped records, here's exactly what OSHA and safety inspectors check when they review your visitor log. Includes a free 10‑point self‑audit.",
      locale: "en",
  },
  {
    slug: "ultimate-guide-modern-visitor-management",
    title: "The Ultimate Guide to Modern Visitor Management",
    date: "2026-06-09",
    lastModified: "2026-06-15",
    excerpt:
      "Why paper visitor logs fail audits, how digital check‑in works, and the essential features a modern visitor management system should have.",
      locale: "en",
  },
  {
    slug: "case-study-small-business",
    title: "How a Small Business Chooses a Visitor Log",
    date: "2026-06-06",
    lastModified: "2026-06-15",
    excerpt:
      "A walk through how a fictional small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
      locale: "en",
  },
  {
    slug: "sitesafe-vs-envoy-swipedon-paper",
    title: "SiteSafe vs Envoy vs SwipedOn vs Paper Logs",
    date: "2026-06-04",
    lastModified: "2026-06-15",
    excerpt:
      "An honest side‑by‑side comparison of digital visitor log solutions, including pricing, features, and hidden costs.",
      locale: "en",
  },
  {
    slug: "feedback-wanted",
    title: "Help Us Improve SiteSafe – Feedback Wanted",
    date: "2026-06-04",
    lastModified: "2026-06-15",
    excerpt:
      "We built a simple digital visitor log and need your honest feedback to make it better.",
      locale: "en",
  },
  {
    slug: "cost-of-failed-safety-audit",
    title: "The Real Cost of a Failed Safety Audit",
    date: "2026-06-03",
    lastModified: "2026-06-15",
    excerpt:
      "Fines are just the start. A failed audit can cost contracts, reputation, and months of work.",
      locale: "en",
  },
  {
    slug: "osha-inspector-visitor-log",
    title: "What an OSHA Inspector Actually Looks For in a Visitor Log",
    date: "2026-06-02",
    lastModified: "2026-06-15",
    excerpt:
      "A complete visitor log can make or break an inspection. Here is what inspectors check.",
      locale: "en",
  },
  {
    slug: "paper-sign-in-sheets-safety-risk",
    title: "Why Paper Visitor Logs Fail Audits – and What to Use Instead",
    date: "2026-06-01",
    lastModified: "2026-06-17",
    excerpt:
      "Paper visitor logs fail safety audits for six specific reasons. Learn why paper sign‑in sheets are a risk and how a digital check‑in system solves every one.",
      locale: "en",
  },
];