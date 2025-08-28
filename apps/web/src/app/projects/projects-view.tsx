"use client";
import { useEffect, useMemo, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  archived: boolean;
  disabled: boolean;
  pushed_at: string;
  private?: boolean; // 👈 NEW
};

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-zinc-800/60 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/80"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight group-hover:underline">
          {repo.name}
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>★ {repo.stargazers_count}</span>
          <span>⑂ {repo.forks_count}</span>
        </div>
      </div>

      {/* privacy badge */}
      <div className="mt-1 flex gap-2 text-xs">
        {repo.private ? (
          <span className="rounded-full border border-red-800 bg-red-950 px-2 py-0.5 text-red-400">
            Private
          </span>
        ) : (
          <span className="rounded-full border border-green-800 bg-green-950 px-2 py-0.5 text-green-400">
            Public
          </span>
        )}
        {repo.archived && (
          <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-zinc-400">
            Archived
          </span>
        )}
      </div>

      {repo.description && (
        <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
          {repo.description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {repo.language && (
          <span className="rounded-full border border-zinc-700/70 bg-zinc-800/50 px-2 py-0.5 text-zinc-300">
            {repo.language}
          </span>
        )}
        {(repo.topics ?? []).slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-zinc-500"
          >
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-4 text-xs text-zinc-500">
        Updated {new Date(repo.pushed_at).toLocaleString()}
      </div>
    </a>
  );
}

export default function ProjectsView() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("all");
  const [sort, setSort] = useState<"updated" | "stars">("updated");
  const [includeArchived, setIncludeArchived] = useState(false);

  async function load() {
    const res = await fetch("/api/github/repos", { cache: "no-store" });
    const json = await res.json();
    setRepos(json.repos ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  const languages = useMemo(() => {
    const s = new Set<string>();
    (repos ?? []).forEach((r) => r.language && s.add(r.language));
    return ["all", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [repos]);

  const filtered = useMemo(() => {
    if (!repos) return [] as Repo[];
    let arr = repos.filter((r) =>
      includeArchived ? true : !r.archived && !r.disabled
    );
    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter(
        (r) =>
          r.name.toLowerCase().includes(t) ||
          (r.description ?? "").toLowerCase().includes(t) ||
          (r.topics ?? []).some((x) => x.toLowerCase().includes(t))
      );
    }
    if (lang !== "all") arr = arr.filter((r) => r.language === lang);
    if (sort === "updated")
      arr.sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
    else
      arr.sort(
        (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
      );
    return arr;
  }, [repos, q, lang, sort, includeArchived]);

  return (
    <section className="mt-8">
      {/* controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <input
            placeholder="Search name, topic, description…"
            className="w-72 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={includeArchived}
            onChange={(e) => setIncludeArchived(e.target.checked)}
          />
          Include archived/disabled
        </label>
      </div>

      {/* grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <RepoCard key={r.id} repo={r} />
        ))}
      </div>

      {!repos && <div className="mt-8 text-zinc-400">Loading…</div>}
      {repos && filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
          No repositories matched your filters.
        </div>
      )}
    </section>
  );
}
