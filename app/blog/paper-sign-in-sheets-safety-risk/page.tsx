// app/blog/paper-sign-in-sheets-safety-risk/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Paper Sign‑In Sheets Are a Safety Risk – SiteSafe Blog",
  description:
    "Paper visitor logs get lost, ruined, and are illegible. A digital check‑in is safer and audit‑ready.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Why Paper Sign‑In Sheets Are a Safety Risk
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 2 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Walk onto most construction sites and you will find the same thing near the trailer door:
            a clipboard with a wrinkled sheet of paper and a pen that barely works. It has been the
            standard for decades. And it is quietly one of the biggest liabilities on the job.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The problem is not the paper. It is what happens to it.
          </h2>
          <p>
            Paper logs get lost. They get rained on. They get coffee spilled on them. They get tossed
            in the back of a truck and never seen again. When an OSHA inspector shows up — or worse,
            after an incident — the one thing you need is a clear record of who was on site and when.
            A soggy clipboard does not hold up.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            Illegible handwriting is a real liability
          </h2>
          <p>
            Even if the sheet survives, can you actually read it? Between rushed scrawls, misspelled
            names, and missing fields, a paper log often raises more questions than it answers. In an
            audit, that ambiguity works against you.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            Missing safety acknowledgments
          </h2>
          <p>
            Most paper logs do not include a safety briefing acknowledgment at all — or it is a separate
            form that gets separated. Without a clear record that a visitor was briefed on site hazards,
            you are exposed if something goes wrong.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            There is a simpler way
          </h2>
          <p>
            A digital sign‑in does not need to be complicated or expensive. A simple tablet at the
            entrance can replace the clipboard entirely. Workers enter their name and company, check a
            box to confirm they have read the safety rules, and that is it. The data is instantly
            available to the site manager, stored securely, and ready to export for any inspector.
          </p>

          <p>
            We built <strong className="text-white">SiteSafe</strong> to be exactly that — a digital
            visitor log that is as simple as paper, but actually reliable. It takes 30 seconds to set
            up, works on any tablet or phone, and lets you export audit‑ready PDFs in seconds.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            What this means for your site
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No more lost or damaged sign‑in sheets</li>
            <li>Every visitor acknowledges safety rules</li>
            <li>Instant export for inspections</li>
            <li>Real‑time visibility of who is on site</li>
          </ul>

          <p className="mt-6 italic text-slate-300">
            Ready to ditch the clipboard? Try SiteSafe free for 14 days — no credit card required.{" "}
            <a href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors duration-150">
              Start your trial here
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}