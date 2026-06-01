// app/checkin/layout.tsx
export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No header, no footer – pure kiosk mode
  return <>{children}</>;
}