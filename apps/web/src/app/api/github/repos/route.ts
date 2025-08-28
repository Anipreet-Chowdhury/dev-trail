import { NextResponse } from "next/server";
import { fetchUserRepos } from "@/lib/github";


export const dynamic = "force-dynamic"; // always run at request time


export async function GET(req: Request) {
    const username = process.env.GITHUB_USERNAME;
    if (!username) {
        return NextResponse.json({ error: "GITHUB_USERNAME missing" }, { status: 500 });
    }
    try {
        const repos = await fetchUserRepos(username);
        return NextResponse.json({ repos });
    } 
    catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}