import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "Visitor Management for Schools: What Principals Need to Know | SiteSafe",
  description:
    "A practical guide to modern visitor management for K‑12 schools. Learn what principals should look for, from photo capture and emergency lists to watchlist screening.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Visitor Management for Schools: What Principals Need to Know
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 7 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            A stranger walks through the front door. They sign a paper log with a
            name that’s hard to read. They’re handed a sticky badge and pointed
            down the hall. Nobody knows who they are, why they’re here, or whether
            they were screened.
          </p>
          <p>
            That scenario plays out in thousands of K‑12 schools every day. And
            for principals, it’s a liability that can be solved in under an hour.
            Here’s what you need to know about modern visitor management—and how
            to choose a system that actually protects your students.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Paper logs are the weakest link
          </h2>
          <p>
            Paper visitor logs give you a false sense of security. Anyone can
            write any name. Handwriting is illegible. Sheets get lost, damaged,
            or thrown away. When you need to know who was in the building
            yesterday at 10 a.m., a paper log won’t help you.
          </p>
          <p>
            A digital system replaces the clipboard with a tablet or QR code.
            Every visitor must enter their real name, company, and who they’re
            visiting. The record is stored permanently and can be searched,
            filtered, and exported in seconds.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. You need to know who is on campus right now
          </h2>
          <p>
            In a fire drill, a lockdown, or a real emergency, the first question
            is always: who is in the building? A paper log can’t answer that.
            A digital system with a real‑time dashboard shows you every visitor
            currently on site—their name, photo, host, and sign‑in time—updated
            automatically every few seconds.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Photo capture is no longer optional
          </h2>
          <p>
            A visitor badge with a photo is one of the simplest, most effective
            security measures a school can implement. It tells staff at a glance
            that someone belongs. It also creates a visual record that can be
            reviewed after an incident. Modern systems let visitors take a photo
            at check‑in using a tablet or their own phone.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. Every visitor should acknowledge your school rules
          </h2>
          <p>
            Do your visitors know they can’t enter certain hallways? That they
            must check in at the office first? That they can’t take photos of
            students? A digital system can require every visitor to acknowledge
            your school’s rules before they’re allowed to check in. That
            acknowledgment is timestamped and stored—proving they were informed.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            5. Watchlist screening stops problems before they start
          </h2>
          <p>
            If a parent has a restraining order, or a former vendor shouldn’t be
            on campus, you need a way to flag them before they walk past the
            front desk. A watchlist does exactly that. When a flagged person
            tries to check in, they’re stopped immediately, and the front office
            or school resource officer is alerted via email, Slack, or webhook.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            6. Emergency evacuation lists save time and lives
          </h2>
          <p>
            When a fire alarm sounds, you don’t have time to flip through a
            sign‑in sheet. A one‑click emergency evacuation list generates a PDF
            of every visitor on campus—including their photo, host name, phone
            number, and sign‑in time. You hand it to the fire marshal or incident
            commander and account for everyone.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            7. Lockdown mode gives you instant control
          </h2>
          <p>
            In a lockdown, every second matters. A single button blocks all new
            check‑ins and visually marks the site as locked down. Active visitors
            remain visible, so you know exactly who was inside when the lockdown
            began. When the situation is resolved, one click ends it and normal
            operations resume.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            8. What to look for in a visitor management system
          </h2>
          <p>
            When evaluating systems, ask these five questions:
          </p>
          <ol className="space-y-1 text-slate-200 list-decimal pl-5">
            <li>Does it capture visitor photos?</li>
            <li>Can I see who’s on campus right now in real time?</li>
            <li>Does it enforce school rules with a mandatory acknowledgment?</li>
            <li>Does it have a one‑click emergency evacuation list?</li>
            <li>Can I block specific people from checking in?</li>
          </ol>
          <p>
            If the answer to any of those is no, keep looking.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            9. Price shouldn’t keep you from being secure
          </h2>
          <p>
            Many visitor management systems charge per building or per visitor.
            For a school district with multiple campuses, that can mean thousands
            of dollars per year. A flat‑priced system like SiteSafe ($49/month
            for unlimited sites and visitors) removes that barrier. Every school
            in your district can be protected for one predictable cost.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            10. Try it before you commit
          </h2>
          <p>
            The best way to know if a system works for your school is to use it.
            SiteSafe offers a 14‑day free trial with no credit card and no sales
            calls. You can set up a site in under two minutes and see the
            dashboard, check‑in flow, and emergency features for yourself.
          </p>

          <p className="italic text-slate-300 mt-6">
            Ready to make your school safer?{" "}
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
              Start your free 14‑day trial of SiteSafe
            </Link>{" "}
            — no credit card, no sales call.
          </p>
        </div>
        <BlogPostJsonLd
          title="Visitor Management for Schools: What Principals Need to Know"
          description="A practical guide to modern visitor management for K‑12 schools. Learn what principals should look for, from photo capture and emergency lists to watchlist screening."
          datePublished="2026-06-18"
          dateModified="2026-06-18"
          slug="visitor-management-for-schools"
        />
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Not sure where your school stands?{" "}
        <Link href="/audit" className="text-sky-400 hover:underline">
          Take our free 10‑point visitor log self‑audit
        </Link>{" "}
        — no sign‑up required.
      </p>
    </div>
  );
}