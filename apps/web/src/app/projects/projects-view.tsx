"use client";
import { useEffect, useMemo, useState } from "react";
import { relTime } from "@/utils/time"

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

type RepoCardProps = {
  repo: Repo;
  onTopicClick?: (t: string) => void;   // optional: for topic filtering
  activeTopic?: string;                 // optional: highlight selected topic
};

function RepoCard({ repo, onTopicClick, activeTopic }: RepoCardProps) {
  const absUpdated = new Date(repo.pushed_at).toLocaleString();

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-zinc-800/60 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/80"
      title={`Open ${repo.full_name} on GitHub`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight group-hover:underline">
          {repo.name}
        </h3>

        {/* updated + metrics */}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="whitespace-nowrap" title={absUpdated}>
            Updated {relTime(repo.pushed_at)}
          </span>
          <span aria-label={`${repo.stargazers_count} stars`}>★ {repo.stargazers_count}</span>
          <span aria-label={`${repo.forks_count} forks`}>⑂ {repo.forks_count}</span>
        </div>
      </div>

      {/* visibility/archived pills */}
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
        {repo.private ? (
          <span className="rounded-full border border-red-800 bg-red-950 px-2 py-0.5 text-red-400">Private</span>
        ) : (
          <span className="rounded-full border border-green-800 bg-green-950 px-2 py-0.5 text-green-400">Public</span>
        )}
        {repo.archived && (
          <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-zinc-400">Archived</span>
        )}
      </div>

      {repo.description && (
        <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{repo.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {repo.language && (
          <span className="rounded-full border border-zinc-700/70 bg-zinc-800/50 px-2 py-0.5 text-zinc-300">
            {repo.language}
          </span>
        )}

        {(repo.topics ?? []).slice(0, 6).map((t) => {
          const selected = activeTopic === t;
          const asButton = Boolean(onTopicClick);

          const common =
            "rounded-full border px-2 py-0.5 transition";
          const normal =
            "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300";
          const active =
            "border-zinc-600 bg-zinc-800 text-zinc-200";

          return asButton ? (
            <button
              key={t}
              type="button"
              onClick={() => onTopicClick?.(t)}
              aria-pressed={selected}
              title={`Filter by #${t}`}
              className={`${common} ${selected ? active : normal}`}
            >
              #{t}
            </button>
          ) : (
            <span key={t} className={`${common} ${normal}`}>#{t}</span>
          );
        })}
      </div>
    </a>
  );
}

export default function ProjectsView() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("all");
  const [sort, setSort] = useState<"updated" | "stars">("updated");
  const [visibility, setVisibility] = useState<"all"|"public"|"private">("all");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const onTopicClick = (t: string) => setTopic((cur) => (cur === t ? "" : t));


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
    let arr = repos.filter(r => (includeArchived ? true : !r.archived && !r.disabled));

    if (q.trim()) {
        const t = q.toLowerCase();
        arr = arr.filter(r =>
        r.name.toLowerCase().includes(t) ||
        (r.description ?? "").toLowerCase().includes(t) ||
        (r.topics ?? []).some(x => x.toLowerCase().includes(t))
        );
    }

    if (lang !== "all") arr = arr.filter(r => r.language === lang);
    if (visibility !== "all") {
        const wantPrivate = visibility === "private";
        arr = arr.filter((r) => (wantPrivate ? !!r.private : !r.private));
    }

    // NEW: topic filter (case-insensitive)
    if (topic) {
        const t = topic.toLowerCase();
        arr = arr.filter(r => (r.topics ?? []).some(x => x.toLowerCase() === t));
    }

    if (sort === "updated") {
        arr.sort((a,b)=> new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
    } else {
        arr.sort((a,b)=> (b.stargazers_count || 0) - (a.stargazers_count || 0));
    }
    return arr;
}, [repos, q, lang, topic, visibility, sort, includeArchived]);



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
          {topic && (
            <button
                onClick={() => setTopic("")}
                className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300"
                title="Clear topic filter"
            >
                Topic: #{topic} ×
            </button>
          )}
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l === "all" ? "All languages" : l}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
            value={visibility}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setVisibility(e.target.value as "all" | "public" | "private")
            }
            >
            <option value="all">Private and Public</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as "updated" | "stars")}
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
          <RepoCard key={r.id} repo={r} onTopicClick={onTopicClick} activeTopic={topic} />
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
