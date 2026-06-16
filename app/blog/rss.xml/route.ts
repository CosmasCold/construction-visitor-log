import { posts } from "@/data/blog-posts";

const BASE_URL = "https://sitesafe.thesift.space";

export function GET() {
  const items = posts.map((post) => {
    const url = `${BASE_URL}/blog/${post.slug}`;
    return `<item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <description>${esc(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${url}</guid>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SiteSafe Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Smart visitor management tips, compliance guides, and product updates.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}