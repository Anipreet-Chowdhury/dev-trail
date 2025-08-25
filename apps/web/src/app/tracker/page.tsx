export default function Tracker() {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Coding Tracker</h1>
        <div className="rounded-2xl border border-white/10 p-5">
          <h2 className="font-medium mb-3">Streak Heatmap</h2>
          <div className="h-40 border border-dashed border-white/15 rounded-xl grid place-items-center text-white/50">
            Heatmap placeholder
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 p-5">
          <h2 className="font-medium mb-3">Recent Updates</h2>
          <ul className="text-sm text-white/80">
            <li>• 2025‑08‑25: Bootstrapped MVP skeleton.</li>
          </ul>
        </div>
      </section>
    );
  }
  