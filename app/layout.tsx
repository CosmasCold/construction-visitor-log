// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SiteSafe – Construction Visitor Log",
  description:
    "Digital check‑in for construction sites. Replace paper logs with an audit‑ready visitor management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Main content fills available space */}
        <main className="flex-1">{children}</main>

        {/* Footer – always at the bottom */}
        <footer className="bg-black/20 border-t border-white/5 text-slate-400 py-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="text-sm">
      &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
    </div>
    <div className="flex gap-6 text-sm">
      <Link href="/terms" className="hover:text-white transition-colors">
        Terms of Service
      </Link>
      <Link href="/privacy" className="hover:text-white transition-colors">
        Privacy Policy
      </Link>
      <a href="mailto:cloudandclipboard@gmail.com" className="hover:text-white transition-colors">
        Contact
      </a>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}