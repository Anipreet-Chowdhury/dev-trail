import { Suspense } from "react";
import ProjectsView from "./projects-view";
import PinnedRow from "./pinned";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-zinc-400">Live from GitHub · sorted by recent activity</p>
      <Suspense fallback={<div className="mt-8 animate-pulse text-zinc-400">Loading…</div>}>
        {/* <PinnedRow /> */}
        <ProjectsView />
      </Suspense>
    </main>
  );
}
