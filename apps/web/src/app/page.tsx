export default function Home() {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl md:text-5xl font-semibold">Hi, I’m Anipreet.</h1>
      <p className="text-white/80 max-w-2xl">
        This is my portfolio + routine tracker. I build data-heavy apps and log progress publicly.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="About me" body="India → Canada → Data + Fullstack." />
        <Card title="My Journey" body="Milestones, pivots, lessons." />
        <Card title="Skills" body="Python, SQL, FastAPI, Next.js, Firebase, BigQuery, ML/NLP." />
        <Card title="Goals (2025)" body="Ship 4 projects by Dec 15. Sub‑25 5K. PS5 reward." />
      </div>
    </section>
  );
}
function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5 hover:border-white/20 transition">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{body}</p>
    </div>
  );
}
