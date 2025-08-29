"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShowcaseProject, Repo } from "@/types";
import { statusRank, statusStyle } from "@/Helpers";
import { classNames } from "@/Helpers";
import { SEED } from "@/data/showcasedata";
import { fetchRepoClient } from "@/Helpers";

export default function ShowcasePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"status" | "recent">("status");
  const [openVideo, setOpenVideo] = useState<ShowcaseProject | null>(null);
  const [openImage, setOpenImage] = useState<{ url: string; title: string } | null>(null);
  const [repoInfo, setRepoInfo] = useState<Record<string, any>>({});

  // pull live GitHub stats once on mount (private repos supported via API route)
  useEffect(() => {
    (async () => {
      const repos = SEED.filter((p:ShowcaseProject) => p.repo).map((p: ShowcaseProject) => p.repo!);
      const entries = await Promise.all(
        repos.map(async (r: string) => {
          try {
            const data = await fetchRepoClient(r); // calls /api/github/repo/:owner/:name
            return [r, data] as const;
          } catch {
            return [r, null] as const;
          }
        })
      );
      setRepoInfo(Object.fromEntries(entries));
    })();
  }, []);

  const allTags = useMemo<string[]>(() => {
    const tags = SEED.flatMap((p: ShowcaseProject) => p.tags);
    return Array.from(new Set<string>(tags)).sort();
  }, []); 

  const filtered = useMemo(() => {
    interface FilteredProject extends ShowcaseProject {}

    interface RepoInfo {
      stargazers_count?: number;
      forks_count?: number;
      pushed_at?: string;
      [key: string]: any;
    }

    return SEED.filter(
      (p: FilteredProject) =>
        (!activeTag || p.tags.includes(activeTag)) &&
        (!search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.summary.toLowerCase().includes(search.toLowerCase()))
    ).sort((a: FilteredProject, b: FilteredProject) => {
      if (sortBy === "status") {
        return statusRank[b.status] - statusRank[a.status];
      }
      // recent by GitHub pushed_at when available
      const aRepo: RepoInfo | null = a.repo ? repoInfo[a.repo] : null;
      const bRepo: RepoInfo | null = b.repo ? repoInfo[b.repo] : null;
      const aTime: number = aRepo?.pushed_at ? new Date(aRepo.pushed_at).getTime() : 0;
      const bTime: number = bRepo?.pushed_at ? new Date(bRepo.pushed_at).getTime() : 0;
      return bTime - aTime;
    });
  }, [activeTag, search, sortBy, repoInfo]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-zinc-200">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Showcase</h1>
          <p className="mt-1 text-zinc-400">
            Deep dives into my flagship builds. Watch 60–90s Looms, skim screenshots,
            and follow progress live via GitHub activity.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-70">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              className="bg-transparent outline-none placeholder:text-zinc-500"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm"
          >
            <option value="status">Sort: Status</option>
            <option value="recent">Sort: Recent activity</option>
          </select>
        </div>
      </header>

      {/* Tag filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={classNames(
            "rounded-full border px-3 py-1 text-sm",
            activeTag === null
              ? "border-zinc-200 bg-zinc-200 text-zinc-900"
              : "border-zinc-700 hover:border-zinc-500"
          )}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t === activeTag ? null : t)}
            className={classNames(
              "rounded-full border px-3 py-1 text-sm",
              t === activeTag
                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                : "border-zinc-700 hover:border-zinc-500"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((p:ShowcaseProject) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900"
            >
              {/* Top media */}
              <div className="relative aspect-video w-full overflow-hidden">
                {p.screenshots?.[0] ? (
                  <img
                    src={p.screenshots[0]}
                    alt={`${p.title} screenshot`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onClick={() => setOpenImage({ url: p.screenshots![0], title: p.title })}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800/50 text-zinc-500">
                    Media coming soon
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                <div className="absolute left-3 top-3">
                  <span
                    className={classNames(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      statusStyle(p.status)
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-4">
                <header>
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-zinc-400">{p.summary}</p>
                </header>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTag(t === activeTag ? null : t)}
                      className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-300 hover:border-zinc-500"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Repo stats / actions */}
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    {p.repo && (
                      <>
                        <span title="Stars" className="inline-flex items-center gap-1">
                          ⭐ {repoInfo[p.repo]?.stargazers_count ?? "—"}
                        </span>
                        <span title="Forks" className="inline-flex items-center gap-1">
                          🍴 {repoInfo[p.repo]?.forks_count ?? "—"}
                        </span>
                        <span title="Last push" className="inline-flex items-center gap-1">
                          ⏱️{" "}
                          {repoInfo[p.repo]?.pushed_at
                            ? new Date(repoInfo[p.repo].pushed_at).toLocaleDateString()
                            : "—"}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.loomUrl && (
                      <button
                        onClick={() => setOpenVideo(p)}
                        className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 hover:border-emerald-400/60"
                      >
                        ▶ Watch Loom
                      </button>
                    )}
                    <a
                      href={`/showcase/${p.slug}`}
                      className="rounded-lg border border-zinc-700 px-2.5 py-1 text-xs text-zinc-200 hover:border-zinc-500"
                    >
                      Details
                    </a>
                    {p.repo && (
                      <a
                        href={`https://github.com/${p.repo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-zinc-700 px-2.5 py-1 text-xs text-zinc-200 hover:border-zinc-500"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Secondary media row */}
                {p.screenshots && p.screenshots.length > 1 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {p.screenshots.slice(1, 4).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${p.title} screenshot ${i + 2}`}
                        className="aspect-video w-full cursor-pointer rounded-lg border border-zinc-800 object-cover hover:opacity-90"
                        onClick={() => setOpenImage({ url: src, title: p.title })}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Loom modal */}
      <AnimatePresence>
        {openVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            onClick={() => setOpenVideo(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h4 className="text-sm font-medium text-zinc-200">
                  {openVideo.title} — Loom Preview
                </h4>
                <button
                  onClick={() => setOpenVideo(null)}
                  className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500"
                >
                  Close
                </button>
              </div>
              <div className="aspect-video w-full">
                {openVideo.loomUrl ? (
                  <iframe
                    src={openVideo.loomUrl.replace("share", "embed")}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-500">
                    Loom coming soon
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image lightbox */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
            onClick={() => setOpenImage(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h4 className="text-sm font-medium text-zinc-200">{openImage.title}</h4>
                <button
                  onClick={() => setOpenImage(null)}
                  className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500"
                >
                  Close
                </button>
              </div>
              <img src={openImage.url} alt={openImage.title} className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-10 text-center text-sm text-zinc-500">
        Tip: Click a tag to filter. Use “Recent activity” sort to surface actively updated repos.
      </p>
    </div>
  );
}
