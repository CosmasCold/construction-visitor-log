// lib/auth-guard.ts
// Auth helpers + company isolation for SiteSafe API routes

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  companyId: string;
  company: { id: string; name: string; slug: string };
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Authenticate the request. Returns user + companyId, or a 401/429 response.
 * Optionally pass an Upstash limiter for rate limiting.
 */
export async function requireAuth(
  req: NextRequest,
  opts: { limiter?: Ratelimit } = {}
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      user: null,
      companyId: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (opts.limiter) {
    const ip = getClientIp(req);
    const { success, limit, remaining, reset } = await opts.limiter.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return {
        user: null,
        companyId: null,
        response: NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: {
              "Retry-After": String(retryAfter),
              "X-RateLimit-Limit": String(limit),
              "X-RateLimit-Remaining": String(remaining),
            },
          }
        ),
      };
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!user) {
    return {
      user: null,
      companyId: null,
      response: NextResponse.json({ error: "User not found" }, { status: 404 }),
    };
  }

  return {
    user: user as AuthenticatedUser,
    companyId: user.companyId,
    response: null,
  };
}

/**
 * Verify a site belongs to the user's company.
 * Returns a 404 response if not, or null if access is granted.
 */
export async function requireSiteAccess(
  siteId: string,
  companyId: string
) {
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { companyId: true },
  });

  if (!site || site.companyId !== companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return null;
}

/**
 * Verify a blocklist entry belongs to the user's company.
 */
export async function requireBlocklistAccess(
  blocklistId: string,
  companyId: string
) {
  const entry = await prisma.blocklistEntry.findUnique({
    where: { id: blocklistId },
    select: { companyId: true },
  });

  if (!entry || entry.companyId !== companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return null;
}

/**
 * Rate limit a public route (signup, forgot-password, etc.)
 */
export async function requireRateLimit(
  req: NextRequest,
  limiter: Ratelimit
) {
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  }

  return null;
}

/**
 * Check if user is admin or company owner.
 */
export function requireAdmin(user: AuthenticatedUser) {
  if (user.role !== "admin" && user.role !== "company_owner") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  return null;
}