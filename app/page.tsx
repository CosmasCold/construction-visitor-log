// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-amber-400">SiteSafe</span>
              <span className="block mt-2 text-white">Construction Visitor Log</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
              Replace paper logs with digital check‑in across all your construction sites.
              Know exactly who’s on site, enforce safety briefings, and stay audit‑ready — without the clipboard.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50" />
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800">How SiteSafe works</h2>
          <p className="mt-4 text-lg text-slate-500">Three simple steps to replace your clipboard forever.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mb-4 text-2xl font-bold">1</div>
            <h3 className="text-lg font-semibold text-slate-800">Sign in visitors</h3>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              Workers enter their name, company, and acknowledge safety rules — no paper, no hassle.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mb-4 text-2xl font-bold">2</div>
            <h3 className="text-lg font-semibold text-slate-800">Real‑time dashboard</h3>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              See who’s on site right now, export logs for audits, and manage multiple projects from one place.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mb-4 text-2xl font-bold">3</div>
            <h3 className="text-lg font-semibold text-slate-800">Stay compliant</h3>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              Digital audit trail, mandatory safety acknowledgments, and instant CSV/Excel exports keep you inspection‑ready.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Ready to ditch the clipboard?</h2>
          <p className="mt-4 text-lg text-slate-500">
            Set up your company in 2 minutes. Free trial, no credit card required until you decide to stay.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            Get started for free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
      </div>
    </div>
  );
}