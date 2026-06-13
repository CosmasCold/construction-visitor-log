// app/blog/feedback-wanted/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Us Improve SiteSafe – Feedback Wanted",
  description:
    "We built a simple Smart Visitor Management System for construction sites and need your honest feedback.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Help Us Improve SiteSafe – Feedback Wanted
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          By the developer of SiteSafe · 2 min read
        </p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            A few months ago, a friend who runs a small construction crew told me his biggest daily
            frustration. Every morning, a clipboard with a paper sign‑in sheet was passed around the
            trailer. By the end of the week it was torn, coffee‑stained, and usually missing half the
            names. When an inspector showed up, they had nothing to show.
          </p>
          <p>
            I thought that sounded like a problem I could help with. So I built a very basic digital
            sign‑in that works on a cheap tablet. Workers enter their name, company, and who they are
            visiting. They tick a box to say they have read the safety rules. The site manager can see
            who is on site right now, and export a clean PDF if they need it.
          </p>
          <p>
            I am not in the construction industry. I am a developer who built this as a side project.
            I am not here to sell you something. I just want to know if this is actually useful to
            people who deal with these problems every day.
          </p>
          <p>
            So here is what I am asking: if you manage a construction site, or you are responsible for
            safety, or you have ever been burned by a paper log during an inspection, would you take
            10 minutes to try it? It is completely free for 14 days. No credit card. No strings. I
            just want to know what works, what is broken, and what is missing.
          </p>
          <p>
            If you are willing to give it a shot, you can find it at{" "}
            <Link
              href="/"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-150"
            >
              sitesafe.thesift.space
            </Link>
            . And if you have thoughts — good, bad, or brutal — please{" "}
            <a
              href="mailto:cloudandclipboard@gmail.com"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-150"
            >
              email me
            </a>
            . I read every message and I will reply to every single one.
          </p>
          <p className="text-slate-300">
            Thanks for reading. I hope this can help someone out there.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10">
  Want to make sure your visitor log survives an audit?{" "}
  <a href="/checklist" className="text-sky-400 hover:underline">
    Grab our free 10‑point checklist
  </a>.
</p>
    </div>
  );
}