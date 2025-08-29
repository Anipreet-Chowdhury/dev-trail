// app/showcase/[slug]/page.tsx
import { fetchRepoReadme } from "@/lib/github";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

// share the same owner/name strings you use in SEED
const SLUG_TO_REPO: Record<string, { title: string; tagline?: string; repo?: string }> = {
  projectpath: {
    title: "ProjectPath",
    tagline: "Syllabus-to-schedule engine.",
    repo: "Anipreet-Chowdhury/ProjectPath",
  },
  resource: {
    title: "ReSource",
    tagline: "Supply-chain resiliency & sourcing rules.",
    repo: "Anipreet-Chowdhury/ReSource",
  },
  citysense: {
    title: "CitySense",
    tagline: "Urban insights & geospatial forecasting.",
    repo: "Anipreet-Chowdhury/CitySense",
  },
  riskcast: {
    title: "RiskCast",
    tagline: "Fraud risk & volume forecasting.",
    repo: undefined, // no repo yet
  },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Next 15+ requires awaiting params in API + pages routed from /app
type RouteParams = Promise<{ slug: string }>;

export default async function ShowcaseDetailPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const meta = SLUG_TO_REPO[slug];

  if (!meta) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-zinc-200">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-zinc-500">Unknown project: {slug}</p>
      </div>
    );
  }

  const readme =
    meta.repo ? await fetchRepoReadme(meta.repo) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-zinc-200">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        {meta.tagline && <p className="mt-1 text-zinc-400">{meta.tagline}</p>}
      </header>
      {/* One-minute Loom — leaving as-is for now */}
      <section>
        <h2 className="mb-3 text-lg font-medium">One-minute Loom</h2>
        <div className="grid place-items-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-10 text-zinc-500">
          Loom embed goes here
        </div>
      </section>
      <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium">README snapshot</h2>

          {readme ? (
            <div className="relative">
              <div
                role="region"
                aria-label="README snapshot"
                tabIndex={0}
                className="h-80 md:h-96 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50
                          p-4 text-[13.5px] leading-5 text-zinc-200 break-words"
              >
                <ReactMarkDown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: (props) => <p className="my-1" {...props} />,
                    ul: (props) => <ul className="my-2 list-disc pl-5" {...props} />,
                    ol: (props) => <ol className="my-2 list-decimal pl-5" {...props} />,
                    li: (props) => <li className="my-0.5" {...props} />,
                    h1: (props) => <h1 className="mt-4 mb-2 text-base font-semibold" {...props} />,
                    h2: (props) => <h2 className="mt-4 mb-2 text-base font-semibold" {...props} />,
                    h3: (props) => <h3 className="mt-3 mb-1.5 text-[15px] font-semibold" {...props} />,
                    hr: (props) => <hr className="my-3 border-zinc-800" {...props} />,
                    blockquote: (props) => (
                      <blockquote className="my-2 border-l-2 border-zinc-700 pl-3 text-zinc-300" {...props} />
                    ),
                    pre: (props) => (
                      <pre className="my-2 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[12.5px] leading-5" {...props} />
                    ),
                    code: (props) => (
                      <code className="rounded bg-zinc-800/50 px-1.5 py-0.5 font-mono text-sm" {...props} />
                    ),
                    table: (props) => (
                      <div className="my-2 overflow-x-auto">
                        <table className="min-w-full text-left text-[13px]" {...props} />
                      </div>
                    ),
                    th: (props) => <th className="border-b border-zinc-800 px-2 py-1 font-medium" {...props} />,
                    td: (props) => <td className="border-b border-zinc-900 px-2 py-1" {...props} />,
                    a: (props) => <a className="underline decoration-zinc-500 underline-offset-2 hover:text-zinc-100" {...props} />,
                  }}
                >
                  {readme}
                </ReactMarkDown>
              </div>

              {/* soft fade at the bottom so the cut-off feels intentional */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </div>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-500">
              README not available yet.
            </div>
          )}
        </section>
    </div>
  );
}
