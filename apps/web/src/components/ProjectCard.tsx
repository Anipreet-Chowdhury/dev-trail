import Link from "next/link";
import { format } from "date-fns";
import { Project } from "@/types";

const badgeBy = {
    planning: "bg-yellow-500/20 text-yellow-300",
    building: "bg-blue-500/20 text-blue-300",
    paused:   "bg-zinc-500/20 text-zinc-300",
    shipped:  "bg-emerald-500/20 text-emerald-300",
  } as const;
  
  export default function ProjectCard({ p }: { p: Project }) {
    const next = p.nextUpdateISO ? format(new Date(p.nextUpdateISO), "PP") : "—";
    return (
      <div className="rounded-2xl border border-white/10 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{p.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${badgeBy[p.status]}`}>{p.status}</span>
        </div>
        <p className="text-sm text-white/70">{p.short}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map(t => (
            <span key={t} className="text-xs text-white/50 border border-white/10 rounded-full px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
        <div className="text-xs text-white/60">Next update: {next}</div>
        <div className="flex gap-3 text-sm">
          <Link href={`/showcase/${p.slug}`} className="underline">Showcase</Link>
          <a href={p.repoUrl} target="_blank" className="underline">Repo</a>
        </div>
      </div>
    );
  }