// app/sitemap.xml/route.ts
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

const BASE_URL = "https://sitesafe.thesift.space";

export function GET() {
  const staticPaths = [
    "",
    "/about",
    "/audit",
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
    "/blog/why-multi-site-visitor-management-breaks-without-standardization", // ← fixed
    "/blog/best-visitor-management-software-2026",   // ← new
    "/changelog",
    "/checklist",
    "/compare",
    "/compare/sine",
    "/compare/proxyclick",
    "/compare/traction-guest",
    "/compare/the-receptionist",
    "/contact",
    "/docs",
    "/faq",
    "/features",
    "/glossary",
    "/integrations",
    "/integrations/slack",
    "/integrations/google-sheets",
    "/integrations/zapier",
    "/locations",
    "/press",
    "/pricing",
    "/privacy",
    "/roi-calculator",
    "/security",
    "/security-features",
    "/signup",
    "/admin/login",
    "/terms",
  ];

  const dynamicPaths = [];
  for (const industry of industries) {
    for (const city of cities) {
      dynamicPaths.push(`/local/${industry.slug}-visitor-${city.slug}`);
    }
  }

  const allPaths = [...staticPaths, ...dynamicPaths];

  const urlElements = allPaths
    .map(
      (path) =>
        `<url><loc>${BASE_URL}${path}</loc><changefreq>monthly</changefreq></url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}