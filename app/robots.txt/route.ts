// app/robots.txt/route.ts
export function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api
Disallow: /checkin
Disallow: /settings
Sitemap: https://sitesafe.thesift.space/sitemap.xml`;

  return new Response(content, { headers: { "Content-Type": "text/plain" } });
}