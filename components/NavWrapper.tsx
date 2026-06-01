// components/NavWrapper.tsx
"use client";

import { usePathname } from "next/navigation";

export default function NavWrapper({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCheckinPage = pathname.startsWith("/checkin");

  return (
    <>
      {!isCheckinPage && header}
      {children}
      {!isCheckinPage && footer}
    </>
  );
}