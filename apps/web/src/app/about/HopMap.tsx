import { Hop } from "@/types";
import React from "react";

export default function HopMap({ hops }: { hops: Hop[] }) {
    const path = hops.map(h => `${h.x},${h.y}`).join(" ");
    return (
        <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900 p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-semibold">World Hops</h2>
                <div className="text-sm text-zinc-400">A schematic route—city to city, chapter to chapter.</div>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/60">
                <svg viewBox="0 0 1000 520" className="w-full h-[360px] bg-zinc-950">
                {/* softly hint continents: simple blobs */}
                    <defs>
                        <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#09090b" />
                            <stop offset="100%" stopColor="#0b0b10" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect x="0" y="0" width="1000" height="520" fill="url(#ocean)" />
                    {/* pseudo‑continents (abstract) */}
                    <g className="fill-zinc-800">
                        <path d="M50 220 C 140 140, 260 120, 360 160 C 420 190, 380 260, 290 280 C 210 300, 110 280, 50 220 Z" />
                        <path d="M600 250 C 650 210, 740 200, 820 230 C 900 260, 930 300, 880 330 C 830 360, 700 360, 640 320 C 610 300, 590 280, 600 250 Z" />
                    </g>
                    {/* route line */}
                    <polyline points={path} className="stroke-indigo-400/80" strokeWidth={3} fill="none" strokeDasharray="6 4" />
                    {/* hops */}
                    {hops.map((h, i) => (
                        <g key={`${h.city}-${i}`}>
                            <circle cx={h.x} cy={h.y} r={10} className="fill-indigo-400" filter="url(#glow)" />
                            <circle cx={h.x} cy={h.y} r={4} className="fill-zinc-950" />
                            <text x={h.x + 14} y={h.y - 10} className="fill-zinc-200 text-[12px] font-medium">
                                {h.city}, {h.country}
                            </text>
                            <text x={h.x + 14} y={h.y + 8} className="fill-zinc-400 text-[11px]">
                                {h.label}{h.year ? ` • ${h.year}` : ""}
                            </text>
                        {/* step index */}
                            <g>
                                <rect x={h.x - 18} y={h.y - 30} rx={4} ry={4} width={22} height={18} className="fill-zinc-800 stroke-zinc-700/70" />
                                <text x={h.x - 8} y={h.y - 17} className="fill-zinc-300 text-[11px]" textAnchor="middle">
                                    {i + 1}
                                </text>
                            </g>
                        </g>
                    ))}
                </svg>
            </div>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {hops.map((h, i) => (
                    <li key={i} className="rounded-lg border border-zinc-800/60 bg-zinc-950 px-3 py-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-zinc-200">{i + 1}. {h.city}</span>
                            <span className="text-zinc-400">{h.year ?? ""}</span>
                        </div>
                        <div className="text-zinc-400">{h.label} • {h.country}</div>
                    </li>
                ))}
            </ol>
        </section>
    );
}