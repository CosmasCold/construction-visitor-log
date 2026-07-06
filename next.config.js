/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    const cspValue = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://client.crisp.chat https://*.sf-syn.com https://www.youtube.com https://www.youtube-nocookie.com https://www.youtube.com/iframe_api https://s.ytimg.com https://analytics.ahrefs.com`,
      "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
      "img-src 'self' https://sitesafe.thesift.space https://images.unsplash.com data: https://saasdb.net https://fazier.com *.crisp.chat https://*.sf-syn.com https://sourceforge.net https://slashdot.org https://topbusinesssoftware.com https://a.fsdn.com *.public.blob.vercel-storage.com https://cdn-b.saashub.com https://img.youtube.com https://i.ytimg.com",
      `connect-src 'self' https://api.brevo.com https://api.stripe.com https://client.crisp.chat wss://client.relay.crisp.chat https://www.youtube-nocookie.com https://www.youtube.com https://analytics.ahrefs.com`,
      `frame-src https://checkout.stripe.com https://js.stripe.com https://www.youtube.com https://www.youtube-nocookie.com https://www.youtube.com/embed/`,
      "font-src 'self' https://client.crisp.chat data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: cspValue },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/(checkin|dashboard|analytics|sites|integrations|dash|check).png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "sitesafe-hg",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
