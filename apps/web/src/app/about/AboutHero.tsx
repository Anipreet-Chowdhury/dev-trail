export default function AboutHero() {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-10">
            <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_320px] items-center">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Hi, I’m Anipreet 👋</h1>
                    <p className="mt-3 text-zinc-300 leading-relaxed max-w-2xl">
                        I’m a Toronto‑based engineer blending  
                        <span className="font-medium text-zinc-100"> data engineering</span>,
                        <span className="font-medium text-zinc-100"> machine learning and </span> 
                        <span className="font-medium text-zinc-100">full‑stack development</span>.
                        I build pragmatic systems: clean UIs, reliable APIs, and pipelines that move the needle.
                        This page tracks my journey across cities and skills—and what I’m mastering next.
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-400">
                        <li className="rounded-full border border-zinc-700/60 px-3 py-1">Next.js • FastAPI • Firebase</li>
                        <li className="rounded-full border border-zinc-700/60 px-3 py-1">BigQuery • Power BI</li>
                        <li className="rounded-full border border-zinc-700/60 px-3 py-1">Docker • CI/CD</li>
                        <li className="rounded-full border border-zinc-700/60 px-3 py-1">NLP • Transformers </li>
                    </ul>
                </div>
                <div className="h-48 md:h-56 rounded-xl bg-zinc-800/50 border border-zinc-700/60 grid place-items-center">
                    <div className="text-center">
                        <div className="text-5xl">🧭</div>
                            <p className="mt-2 text-sm text-zinc-400">Journey • Skills • Goals</p>
                        </div>
                    </div>
                </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_30%)]" />
        </section>
    );
}