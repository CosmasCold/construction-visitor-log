// app/docs/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation – SiteSafe",
  description:
    "Integrate SiteSafe with your own tools using our REST API. List sites, create visitors, sign them out, and fetch visitor logs programmatically.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-3xl font-bold tracking-tight mb-2">API Documentation</h1>
        <p className="text-sm text-slate-400 mb-8">
          Use the SiteSafe REST API to manage visitors and sites programmatically.
        </p>

        {/* Authentication */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Authentication</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          All API requests require a Bearer token. You can generate your
          company’s API key in the <strong>Settings</strong> page of your
          SiteSafe dashboard.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mt-2">
          Include the key in the <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Authorization</code> header:
        </p>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
          Authorization: Bearer ss_your_api_key_here
        </pre>

        {/* Base URL */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Base URL</h2>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 text-xs text-slate-200 overflow-x-auto">
          https://sitesafe.thesift.space/api/v1
        </pre>

        {/* Endpoints */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Endpoints</h2>

        {/* List sites */}
        <h3 className="text-lg font-medium mt-6 mb-2">
          <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded text-xs font-mono mr-2">GET</span>
          /sites
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Returns all sites belonging to your company.
        </p>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_KEY" \\
     https://sitesafe.thesift.space/api/v1/sites`}
        </pre>
        <details className="mt-2">
          <summary className="text-xs text-sky-400 cursor-pointer">Example response</summary>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
{`[
  {
    "id": "cmp...",
    "name": "Headquarters",
    "slug": "headquarters",
    "address": "123 Main St",
    "safetyBriefingText": "Please sign in..."
  }
]`}
          </pre>
        </details>

        {/* List visitors */}
        <h3 className="text-lg font-medium mt-6 mb-2">
          <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded text-xs font-mono mr-2">GET</span>
          /visitors
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Returns visitor logs, optionally filtered by site or date range.
        </p>
        <p className="text-xs text-slate-400 mt-1">Query parameters:</p>
        <ul className="list-disc list-inside text-xs text-slate-400 ml-4 mt-1">
          <li><code>siteId</code> – filter by site ID</li>
          <li><code>from</code> – start date (YYYY-MM-DD)</li>
          <li><code>to</code> – end date (YYYY-MM-DD)</li>
        </ul>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_KEY" \\
     "https://sitesafe.thesift.space/api/v1/visitors?from=2026-06-01&to=2026-06-30"`}
        </pre>

        {/* Create visitor */}
        <h3 className="text-lg font-medium mt-6 mb-2">
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-xs font-mono mr-2">POST</span>
          /visitors
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Creates a new visitor record (simulates a check‑in). The site must belong to your company.
        </p>
        <p className="text-xs text-slate-400 mt-1">Required body fields:</p>
        <ul className="list-disc list-inside text-xs text-slate-400 ml-4 mt-1">
          <li><code>fullName</code></li>
          <li><code>company</code></li>
          <li><code>siteId</code></li>
        </ul>
        <p className="text-xs text-slate-400 mt-1">Optional: <code>phone</code>, <code>email</code>, <code>hostName</code>, <code>safetyAcknowledged</code> (boolean)</p>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
{`curl -X POST \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"fullName":"Jane Doe","company":"Acme","siteId":"cmp..."}' \\
  https://sitesafe.thesift.space/api/v1/visitors`}
        </pre>

        {/* Sign out visitor */}
        <h3 className="text-lg font-medium mt-6 mb-2">
          <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-xs font-mono mr-2">POST</span>
          /visitors/{'{visitorId}'}/signout
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Signs out an existing visitor. The visitor must belong to your company.
        </p>
        <pre className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto">
{`curl -X POST \\
  -H "Authorization: Bearer YOUR_KEY" \\
  https://sitesafe.thesift.space/api/v1/visitors/cmp.../signout`}
        </pre>

        {/* Error responses */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Errors</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          The API returns standard HTTP status codes. A JSON body with an
          <code className="bg-white/10 px-1 py-0.5 rounded text-xs">error</code> field is included for failures.
        </p>
        <ul className="list-disc list-inside text-xs text-slate-400 ml-4 mt-2">
          <li><strong>401</strong> – Missing or invalid API key</li>
          <li><strong>400</strong> – Missing required fields</li>
          <li><strong>404</strong> – Resource not found or access denied</li>
          <li><strong>429</strong> – Rate limit exceeded (future)</li>
        </ul>

        {/* Support */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Support</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          If you have questions or need help with the API, email us at{" "}
          <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-400 hover:text-sky-300 transition-colors">
            cloudandclipboard@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}