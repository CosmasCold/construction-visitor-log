// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://client.crisp.chat",
              "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
              "img-src 'self' https://images.unsplash.com data: https://saasdb.net",
              "connect-src 'self' https://api.brevo.com https://api.stripe.com https://client.crisp.chat wss://client.relay.crisp.chat",
              "frame-src https://checkout.stripe.com https://js.stripe.com",
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