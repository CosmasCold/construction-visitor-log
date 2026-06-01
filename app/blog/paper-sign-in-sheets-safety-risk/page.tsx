// app/blog/page.tsx
export const metadata = {
  title: "Why Paper Sign‑In Sheets Are a Safety Risk – SiteSafe Blog",
  description:
    "Paper visitor logs get lost, ruined, and are illegible. A digital check‑in is safer and audit‑ready.",
};
export default function BlogPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-slate-800">
        <h1 className="text-2xl font-bold mb-2">Why Paper Sign‑In Sheets Are a Safety Risk</h1>
        <p className="text-sm text-slate-500 mb-6">By the SiteSafe team · 2 min read</p>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            Walk onto most construction sites and you’ll find the same thing near the trailer door: a clipboard with a wrinkled sheet of paper and a pen that barely works. It’s been the standard for decades. And it’s quietly one of the biggest liabilities on the job.
          </p>

          <h2 className="text-lg font-semibold mt-6">The problem isn’t the paper. It’s what happens to it.</h2>
          <p>
            Paper logs get lost. They get rained on. They get coffee spilled on them. They get tossed in the back of a truck and never seen again. When an OSHA inspector shows up — or worse, after an incident — the one thing you need is a clear record of who was on site and when. A soggy clipboard doesn’t hold up.
          </p>

          <h2 className="text-lg font-semibold mt-6">Illegible handwriting is a real liability</h2>
          <p>
            Even if the sheet survives, can you actually read it? Between rushed scrawls, misspelled names, and missing fields, a paper log often raises more questions than it answers. In an audit, that ambiguity works against you.
          </p>

          <h2 className="text-lg font-semibold mt-6">Missing safety acknowledgments</h2>
          <p>
            Most paper logs don’t include a safety briefing acknowledgment at all — or it’s a separate form that gets separated. Without a clear record that a visitor was briefed on site hazards, you’re exposed if something goes wrong.
          </p>

          <h2 className="text-lg font-semibold mt-6">There’s a simpler way</h2>
          <p>
            A digital sign‑in doesn’t need to be complicated or expensive. A simple tablet at the entrance can replace the clipboard entirely. Workers enter their name and company, check a box to confirm they’ve read the safety rules, and that’s it. The data is instantly available to the site manager, stored securely, and ready to export for any inspector.
          </p>

          <p>
            We built <strong>SiteSafe</strong> to be exactly that — a digital visitor log that’s as simple as paper, but actually reliable. It takes 30 seconds to set up, works on any tablet or phone, and lets you export audit‑ready PDFs in seconds.
          </p>

          <h2 className="text-lg font-semibold mt-6">What this means for your site</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No more lost or damaged sign‑in sheets</li>
            <li>Every visitor acknowledges safety rules</li>
            <li>Instant export for inspections</li>
            <li>Real‑time visibility of who’s on site</li>
          </ul>

          <p className="mt-6 italic">
            Ready to ditch the clipboard? Try SiteSafe free for 14 days — no credit card required.{" "}
            <a href="/signup" className="text-sky-600 underline">
              Start your trial here
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}