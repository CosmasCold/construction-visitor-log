// app/sitemap.xml/route.ts
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

const BASE_URL = "https://sitesafe.thesift.space";

// Pages that have both EN and PT versions
const localizedPaths = [
  "",
  "/about",
  "/audit",
  "/checklist",
  "/compare",
  "/contact",
  "/docs",
  "/faq",
  "/features",
  "/integrations",
  "/integrations/slack",
  "/integrations/google-sheets",
  "/integrations/zapier",
  "/press",
  "/pricing",
  "/privacy",
  "/roi-calculator",
  "/security",
  "/signup",
  "/terms",
];

// EN-only pages
const enOnlyPaths = [
  "/blog",
  "/blog/cold-email-failure",
  "/blog/envoy-alternative",
  "/blog/swipedon-alternative",
  "/blog/ilobby-alternative",
  "/blog/best-visitor-management-systems",
  "/blog/what-inspectors-look-for-in-visitor-log",
  "/blog/ultimate-guide-modern-visitor-management",
  "/blog/case-study-small-business",
  "/blog/sitesafe-vs-envoy-swipedon-paper",
  "/blog/feedback-wanted",
  "/blog/cost-of-failed-safety-audit",
  "/blog/osha-inspector-visitor-log",
  "/blog/paper-sign-in-sheets-safety-risk",
  "/blog/pass-osha-audit-visitor-log",
  "/blog/proxyclick-alternative",
  "/blog/traction-guest-alternative",
  "/blog/the-receptionist-alternative",
  "/blog/sine-alternative",
  "/blog/visitor-management-for-schools",
  "/blog/capped-plan-20-sites",
  "/blog/ai-powered-visitor-management",
  "/blog/why-multi-site-visitor-management-breaks-without-standardization",
  "/blog/best-visitor-management-software-2026",
  "/blog/visitor-log-book-template-free",
  "/blog/osha-visitor-log-requirements",
  "/blog/visitor-management-roi-calculator",
  "/blog/visitor-sign-in-sheet-template",
  "/changelog",
  "/compare/sine",
  "/compare/proxyclick",
  "/compare/traction-guest",
  "/compare/the-receptionist",
  "/glossary",
  "/locations",
  "/security-features",
  "/admin/login",
];

// PT-only pages
const ptOnlyPaths = [
  "/br",
  "/br/blog/melhor-sistema-controle-visitantes-2026",
  "/br/blog/check-in-digital-obras",
  "/br/blog/modelo-ficha-visitantes-obra",
];

function getPriority(path: string): string {
  if (path === "") return "1.0";
  if (path === "/br") return "0.9";
  if (path.startsWith("/blog/")) return "0.8";
  if (path.startsWith("/compare/")) return "0.7";
  if (path.startsWith("/local/")) return "0.6";
  return "0.6";
}

function getChangeFreq(path: string): string {
  if (path === "" || path === "/br") return "weekly";
  if (path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

export function GET() {
  const urls: string[] = [];

  // Localized pages with hreflang
  for (const path of localizedPaths) {
    const enUrl = `${BASE_URL}${path}`;
    const ptUrl = `${BASE_URL}/br${path}`;
    const priority = getPriority(path);
    const changefreq = getChangeFreq(path);

    urls.push(`<url>
  <loc>${enUrl}</loc>
  <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
  <xhtml:link rel="alternate" hreflang="pt-BR" href="${ptUrl}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`);

    urls.push(`<url>
  <loc>${ptUrl}</loc>
  <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
  <xhtml:link rel="alternate" hreflang="pt-BR" href="${ptUrl}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`);
  }

  // EN-only pages
  for (const path of enOnlyPaths) {
    urls.push(`<url>
  <loc>${BASE_URL}${path}</loc>
  <changefreq>${getChangeFreq(path)}</changefreq>
  <priority>${getPriority(path)}</priority>
</url>`);
  }

  // PT-only pages
  for (const path of ptOnlyPaths) {
    urls.push(`<url>
  <loc>${BASE_URL}${path}</loc>
  <changefreq>${getChangeFreq(path)}</changefreq>
  <priority>${getPriority(path)}</priority>
</url>`);
  }

  // Dynamic local landing pages (EN-only for now)
  for (const industry of industries) {
    for (const city of cities) {
      const path = `/local/${industry.slug}-visitor-${city.slug}`;
      urls.push(`<url>
  <loc>${BASE_URL}${path}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join("\n  ")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}