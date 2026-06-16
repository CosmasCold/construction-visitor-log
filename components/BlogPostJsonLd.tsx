export default function BlogPostJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  authorName = "SiteSafe team",
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  authorName?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "SiteSafe",
      logo: {
        "@type": "ImageObject",
        url: "https://sitesafe.thesift.space/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sitesafe.thesift.space/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}