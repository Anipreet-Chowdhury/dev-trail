import { projects } from "@/data/projects";

export default function Showcase({ params }: { params: { slug: string } }) {
  const proj = projects.find(p => p.slug === params.slug);
  if (!proj) return <div>Not found.</div>;

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">{proj.name}</h1>
        <p className="text-white/70">{proj.short}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">README snapshot</h2>
        <div className="border border-white/10 rounded-2xl p-5 text-white/70">
          Placeholder README excerpt. (Tomorrow: real GitHub README.)
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">One-minute Loom</h2>
        <div className="aspect-video rounded-2xl border border-dashed border-white/15 grid place-items-center text-white/50">
          Loom embed goes here
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Write-up</h2>
        <p className="text-white/80">Problem, approach, stack, challenges, lessons, next steps.</p>
      </section>
    </article>
  );
}
