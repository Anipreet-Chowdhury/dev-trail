import { fetchPinned } from "@/lib/github";
import { Repo } from "@/lib/github";
export const dynamic = "force-dynamic";

export default async function PinnedRow() {
  const username = process.env.GITHUB_USERNAME!;
  const pinned = await fetchPinned(username);
  if (!pinned.length) return null;
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm uppercase tracking-wider text-zinc-400">Pinned</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pinned.map((r: Repo) => (
          <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="rounded-2xl border border-zinc-800/60 bg-zinc-900 p-5 hover:border-zinc-700">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight hover:underline">{r.name}</h3>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span>★ {r.stargazers_count}</span>
                <span>⑂ {r.forks_count}</span>
              </div>
            </div>
            {r.description && <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{r.description}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}