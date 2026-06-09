// app/sitemap.xml/route.ts
const BASE_URL = "https://sitesafe.thesift.space";

export function GET() {
  const staticPages = [
    "",
    "/about",
    "/blog",
    "/blog/paper-sign-in-sheets-safety-risk",
    "/blog/osha-inspector-visitor-log",
    "/blog/cost-of-failed-safety-audit",
    "/blog/feedback-wanted",
    "/blog/sitesafe-vs-envoy-swipedon-paper",
    "/blog/case-study-small-business",
    "/blog/ultimate-guide-modern-visitor-management",
    "/compare",
    "/docs",
    "/faq",
    "/features",
    "/changelog",
    "/checklist",
    "/pricing",
    "/security",
    "/signup",
    "/admin/login",
    "/terms",
    "/privacy",
  ].map((path) => `<url><loc>${BASE_URL}${path}</loc><changefreq>monthly</changefreq></url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}