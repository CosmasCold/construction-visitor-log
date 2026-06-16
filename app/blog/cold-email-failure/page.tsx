import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "I Sent 13 Cold Email Campaigns and Got 0 Sign‑ups – SiteSafe Blog",
  description:
    "A honest look at what I tried, what failed, and what I learned from reaching out to 200+ site managers about SiteSafe.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          I Sent 13 Cold Email Campaigns and Got 0 Sign‑ups
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 4 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            After building SiteSafe, I was excited. I had a working product,
            a nice landing page, and a flat price that undercut the big
            players. So I did what every founder does: I started reaching out
            to people who I thought would love it.
          </p>
          <p>
            Over two weeks, I sent 13 different cold email campaigns to more
            than 200 facility managers, site supervisors, and safety officers.
            I varied the subject lines, the messaging, the call‑to‑action. I
            kept it short. I made it personal. I offered a free 14‑day trial
            with no credit card.
          </p>
          <p>
            The result? Three people clicked through to the website. Zero
            signed up.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            What I tried
          </h2>
          <p>
            I started with a friendly, direct pitch: “Hi [Name], I built a
            simple digital visitor log for construction sites. No sales calls,
            $49/month flat. Want to try it?” That got no replies. Then I tried
            a problem‑first approach: “I saw your company uses paper sign‑in
            sheets. Are you ever worried about an audit?” Still nothing.
          </p>
          <p>
            I sent emails with a free audit checklist, with a short demo
            video, with a “quick question” subject line. I tested different
            times of day, different days of the week. I even hand‑wrote the
            first sentence of each email to make it feel one‑on‑one. Not a
            single sign‑up.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            What I learned
          </h2>
          <p>
            First, cold email is an uphill battle when you’re an unknown
            brand. Facility managers get dozens of pitches a week — from
            software vendors, suppliers, and consultants. Most get deleted
            within seconds. Your email has to be so valuable that they’d thank
            you for sending it. A “free trial” isn’t valuable enough.
          </p>
          <p>
            Second, the construction and facilities industry is built on trust
            and relationships. People want to hear about a tool from someone
            they know, not from a stranger’s inbox. A referral from another
            site manager would have been 100x more effective than my best
            email.
          </p>
          <p>
            Third, I needed to offer something completely free and useful that
            didn’t require a demo or a sign‑up. That’s why I built the free
            10‑point visitor log self‑audit. It lets someone see their own
            gaps without talking to me. If the audit shows a problem, they
            come to SiteSafe on their own terms.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            What I’m doing differently now
          </h2>
          <p>
            Instead of cold email, I’m focusing on content that pulls people
            in. I’m writing blog posts that answer real questions (like “what
            does an inspector look for in a visitor log?”). I’m getting listed
            on SaaS directories where people actively search for alternatives.
            I’m publishing articles in facility management publications. And
            I’m building free tools that are genuinely useful without any
            strings attached.
          </p>
          <p>
            If you’re a founder reading this and your cold email isn’t
            working, you’re not alone. It’s not that your product is bad. It’s
            that cold email is the hardest channel to make work without
            an existing reputation. Build something people actually need and
            they’ll find you.
          </p>

          <p className="italic text-slate-300 mt-6">
            Want to see if your visitor log would survive an audit?{" "}
            <Link href="/audit" className="text-sky-400 hover:text-sky-300 transition-colors">
              Take the free self‑audit
            </Link>{" "}
            — no sign‑up required.
          </p>
        </div>
        <BlogPostJsonLd
          title="I Sent 13 Cold Email Campaigns and Got 0 Sign‑ups"
          description="A honest look at what I tried, what failed, and what I learned from reaching out to 200+ site managers about SiteSafe."
          datePublished="2026-06-14"
          dateModified="2026-06-15"
          slug="cold-email-failure"
        />
      </div>
    </div>
  );
}