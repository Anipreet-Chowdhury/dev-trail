// app/api/github/debug/route.ts
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ hasToken: false }, { status: 500 });

  const r = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  const scopes = r.headers.get("x-oauth-scopes"); // classic PAT scopes listed here
  const me = await r.json();
  return NextResponse.json({ hasToken: true, status: r.status, login: me?.login, scopes });
}
