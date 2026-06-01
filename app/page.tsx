// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-sky-400">SiteSafe</span>
          <span className="block mt-2 text-white">Construction Visitor Log</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
          Replace paper logs with digital check‑in across all your construction sites.
          Know exactly who’s on site, enforce safety briefings, and stay audit‑ready — without the clipboard.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          14‑day free trial, then $29/mo per company. Cancel anytime.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-lg"
          >
            Start Free Trial
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            How it works
          </a>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">How SiteSafe works</h2>
          <p className="mt-4 text-lg text-slate-300">Three simple steps to replace your clipboard forever.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Sign in visitors",
              text: "Workers enter their name, company, and acknowledge safety rules — no paper, no hassle.",
            },
            {
              step: "2",
              title: "Real‑time dashboard",
              text: "See who’s on site right now, export logs for audits, and manage multiple projects from one place.",
            },
            {
              step: "3",
              title: "Stay compliant",
              text: "Digital audit trail, mandatory safety acknowledgments, and instant CSV/Excel/PDF exports keep you inspection‑ready.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white/5 backdrop-blur-sm py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to ditch the clipboard?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Set up your company in 2 minutes. Free trial, no credit card required until you decide to stay.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-colors"
          >
            Get started for free
          </Link>
        </div>
      </div>
    </div>
  );
}