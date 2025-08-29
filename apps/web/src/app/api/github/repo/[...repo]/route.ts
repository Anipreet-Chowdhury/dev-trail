import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // ensure process.env is available

function ghHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

// NOTE: params is async now — await it before reading properties
type RouteParams = Promise<{ repo?: string[] }>;

export async function GET(_req: Request, ctx: { params: RouteParams }) {
  const { repo = [] } = await ctx.params; // ✅ await
  const owner = decodeURIComponent(repo[0] ?? "");
  const name  = decodeURIComponent(repo[1] ?? "");
  const fullName = owner && name ? `${owner}/${name}` : "";

  if (!fullName) {
    return NextResponse.json(
      { error: 'Use "<owner>/<name>" e.g. /api/github/repo/Anipreet-Chowdhury/ProjectPath' },
      { status: 400 }
    );
  }

  // Hit GitHub and forward the exact response (status + body)
  const r = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers: ghHeaders(),
    cache: "no-store",
  });

  const text = await r.text();
  console.log(`[repo route] ${fullName} -> ${r.status}`);

  return new NextResponse(text, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") ?? "application/json" },
  });
}
