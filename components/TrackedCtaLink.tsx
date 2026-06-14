"use client";

import Link from "next/link";
import { logEvent } from "@/lib/analytics";

export default function TrackedCtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => logEvent("cta_click", { href })}
    >
      {children}
    </Link>
  );
}