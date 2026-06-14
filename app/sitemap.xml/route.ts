// app/sitemap.xml/route.ts
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

const BASE_URL = "https://sitesafe.thesift.space";

export function GET() {
  // ── Static pages ─────────────────────────────────────────────────
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
    "/changelog",
    "/checklist",
    "/compare",
    "/docs",
    "/faq",
    "/features",
    "/integrations",
    "/integrations/slack",
    "/integrations/google-sheets",
    "/integrations/zapier",
    "/pricing",
    "/privacy",
    "/roi-calculator",
    "/security",
    "/signup",
    "/admin/login",
    "/terms",
  ];

  // ── Dynamic city × industry pages ────────────────────────────────
  const dynamicPaths = [];
  for (const industry of industries) {
    for (const city of cities) {
      dynamicPaths.push(
        `/${industry.slug}-visitor-log-${city.slug}`
      );
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