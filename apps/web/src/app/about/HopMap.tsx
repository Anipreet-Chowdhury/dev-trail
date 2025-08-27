// src/app/AboutMe/HopMap.tsx
import React from "react";
import type { Hop } from "@/types";
import { catmullRomPath, labelSide } from "@/Helpers";

type Props = { hops: Hop[]; width?: number; height?: number };

export default function HopMap({ hops, width = 1000, height = 520 }: Props) {
  const pathD = catmullRomPath(hops.map(({ x, y }) => ({ x, y })));

  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900 p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold">World Hops</h2>
        <div className="text-sm text-zinc-400">A schematic route—city to city, chapter to chapter.</div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/60">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[360px] md:h-[420px] bg-zinc-950">
          <defs>
            <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#0b0b10" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={width} height={height} fill="url(#ocean)" />

          {/* abstract land blobs — path version */}
            <g className="fill-zinc-800/80">
            {/* India cluster */}
            <path d="
                M 480 300
                C 520 230, 600 210, 680 240
                C 735 260, 770 305, 750 340
                C 720 385, 640 400, 560 365
                C 510 345, 485 330, 480 300 Z" />
            {/* GTA cluster */}
            <path d="
                M 95 190
                C 120 150, 165 140, 205 160
                C 235 175, 255 205, 240 230
                C 220 260, 175 270, 135 250
                C 110 235, 95 215, 95 190 Z" />
            </g>

          {/* route */}
          <path d={pathD} className="stroke-indigo-400/80" strokeWidth={3} fill="none" strokeDasharray="6 4" />

          {/* hops */}
          {hops.map((h, i) => {
            const side = labelSide(h.x, width);
            const tx = side === "right" ? 20 : -20;
            const anchor = side === "right" ? "start" : "end";
            return (
              <g key={`${h.city}-${i}`}>
                <circle cx={h.x} cy={h.y} r={10} className="fill-indigo-400" filter="url(#glow)" />
                <circle cx={h.x} cy={h.y} r={4} className="fill-zinc-950" />

                <line x1={h.x} y1={h.y} x2={h.x + tx} y2={h.y - 14} className="stroke-zinc-700" strokeWidth={1} />
                <text x={h.x + tx} y={h.y - 20} className="fill-zinc-200 text-[12px] font-medium" textAnchor={anchor}>
                  {h.city}, {h.country}
                </text>
                {/* <text x={h.x + tx} y={h.y - 6} className="fill-zinc-400 text-[11px]" textAnchor={anchor}>
                  {h.label} • {h.name}
                </text> */}

                <g>
                  <rect x={h.x - 18} y={h.y - 30} rx={4} ry={4} width={22} height={18} className="fill-zinc-800 stroke-zinc-700/70" />
                  <text x={h.x - 8} y={h.y - 17} className="fill-zinc-300 text-[11px]" textAnchor="middle">
                    {i + 1}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        {hops.map((h, i) => (
          <li key={i} className="rounded-lg border border-zinc-800/60 bg-zinc-950 px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-200">{i + 1}. {h.city}</span>
              <span className="text-zinc-400">{h.label}</span>
            </div>
            <div className="text-zinc-400">{h.name} • {h.country}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
