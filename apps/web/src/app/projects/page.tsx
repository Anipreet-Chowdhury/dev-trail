import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Projects</h1>
      <p className="text-white/70">Snapshot of each repo: status, tags, and next update.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
