/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable automatic WebP/AVIF serving for imported/local images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      // Global security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://client.crisp.chat https://*.sf-syn.com",
              "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
              "img-src 'self' https://images.unsplash.com data: https://saasdb.net https://fazier.com *.crisp.chat https://*.sf-syn.com https://sourceforge.net https://slashdot.org https://topbusinesssoftware.com https://a.fsdn.com *.public.blob.vercel-storage.com https://cdn-b.saashub.com",
              "connect-src 'self' https://api.brevo.com https://api.stripe.com https://client.crisp.chat wss://client.relay.crisp.chat",
              "frame-src https://checkout.stripe.com https://js.stripe.com https://www.youtube.com",
              "font-src 'self' https://client.crisp.chat data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },

      // ✅ Cache static assets aggressively
      {
        source: "/hero-bg.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(checkin|dashboard|analytics|sites|integrations).png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;