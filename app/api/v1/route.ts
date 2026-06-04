// app/api/v1/route.ts
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    message: "SiteSafe API v1",
    documentation: "https://sitesafe.thesift.space/docs",
    endpoints: {
      sites: "GET /api/v1/sites",
      visitors: "GET /api/v1/visitors",
      createVisitor: "POST /api/v1/visitors",
      signOut: "POST /api/v1/visitors/{id}/signout",
    },
  });
}