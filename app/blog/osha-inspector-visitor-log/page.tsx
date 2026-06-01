// app/blog/osha-inspector-visitor-log/page.tsx
export const metadata = {
  title: "What an OSHA Inspector Actually Looks For – SiteSafe Blog",
  description:
    "A complete visitor log can make or break an inspection. Learn what inspectors check and how to prepare.",
};
export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-slate-800">
        <h1 className="text-2xl font-bold mb-2">What an OSHA Inspector Actually Looks for in a Visitor Log</h1>
        <p className="text-sm text-slate-500 mb-6">By the SiteSafe team · 3 min read</p>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            When an OSHA inspector shows up at your job site, one of the first things they ask for is documentation. And one of the first documents they want to see is your visitor log. If that log is missing, incomplete, or illegible, you are already on the back foot.
          </p>

          <h2 className="text-lg font-semibold mt-6">Why the visitor log matters</h2>
          <p>
            The visitor log is not just a courtesy. It is a record of who was on site, when they arrived, and whether they were aware of the hazards around them. In the event of an incident, that log becomes a legal document. If you cannot produce it, or if it is full of gaps, the inspector will assume your safety management is just as sloppy.
          </p>

          <h2 className="text-lg font-semibold mt-6">What inspectors are trained to look for</h2>
          <p>
            A complete visitor log should show, at minimum:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full name of every visitor</li>
            <li>The company or trade they represent</li>
            <li>Who they came to see (the host)</li>
            <li>Date and time of arrival</li>
            <li>Date and time of departure (or confirmation they left)</li>
            <li>A signed or acknowledged safety briefing</li>
          </ul>
          <p>
            If any of these fields are missing, the inspector will flag it. If they cannot read the handwriting, that is just as bad.
          </p>

          <h2 className="text-lg font-semibold mt-6">The problem with paper</h2>
          <p>
            Paper logs are notoriously incomplete. People skip the departure time because they forget. They scribble their name because they are in a hurry. The safety briefing page gets separated from the sign-in sheet. After a few weeks in the trailer, the whole thing looks like a coffee-stained mess.
          </p>

          <h2 className="text-lg font-semibold mt-6">How to be inspection-ready in 30 seconds</h2>
          <p>
            A digital visitor log solves all of this. Workers cannot check in without acknowledging the safety briefing. Their entry is timestamped automatically. When the inspector asks, you open a dashboard and export a clean PDF. No scrambling, no excuses.
          </p>

          <p>
            That is exactly why we built <strong>SiteSafe</strong> — a simple tablet-based check-in that gives you a complete, audit-ready record of every visitor. It takes minutes to set up and works on any device.
          </p>

          <p className="mt-6 italic">
            See how it works — free 14-day trial, no credit card needed.{" "}
            <a href="/signup" className="text-sky-600 underline">
              Start your trial here
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}