import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scoreParam = searchParams.get("score") ?? "0";
  const score = Math.min(Math.max(parseInt(scoreParam, 10) || 0, 0), 10);

  let color = "#ef4444"; // red
  let label = "High risk";
  if (score >= 7) {
    color = "#0ea5e9"; // sky
    label = "Almost there";
  }
  if (score === 10) {
    color = "#10b981"; // emerald
    label = "Fully covered";
  }
  if (score <= 3) {
    label = "High risk";
  } else if (score <= 6) {
    color = "#f59e0b"; // amber
    label = "Moderate risk";
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
  <text x="12" y="20" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">SiteSafe Audit</text>
  <text x="12" y="38" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="white">${score}/10</text>
  <rect x="120" y="10" width="70" height="30" rx="8" fill="${color}" opacity="0.15" />
  <text x="155" y="30" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="${color}" text-anchor="middle">${label}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}