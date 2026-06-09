// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
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
              "script-src 'self' 'unsafe-inline' https://client.crisp.chat",
              "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
              "img-src 'self' https://images.unsplash.com data: https://saasdb.net https://fazier.com *.crisp.chat",
              "connect-src 'self' https://api.brevo.com https://api.stripe.com https://client.crisp.chat wss://client.relay.crisp.chat",
              "frame-src https://checkout.stripe.com https://js.stripe.com https://www.youtube.com",
              "font-src 'self' https://client.crisp.chat data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;