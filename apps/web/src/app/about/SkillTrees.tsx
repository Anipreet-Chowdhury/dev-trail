"use client";

import { SkillLeaf, SkillTree }  from "@/types";
import React from "react";
import { motion } from "framer-motion";
import { masteryColor } from "@/Helpers";

export function SkillBadge({ leaf }: { leaf: SkillLeaf }) {
    const bar = Math.max(0, Math.min(100, leaf.mastery));
    const base = leaf.future ? "border-dashed opacity-80" : "";
    return (
        <div className={`group relative rounded-xl border ${base} border-zinc-800/70 bg-zinc-950/80 p-3 hover:border-zinc-700/80 transition`}>
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-zinc-200">{leaf.name}</span>
                <span className="text-xs text-zinc-400">{leaf.future ? "future" : `${bar}%`}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-800">
                <div
                    className={`h-2 rounded-full ${masteryColor(bar)}`}
                    style={{ width: `${bar}%` }}
                />
                </div>
                {leaf.note && (
                    <div className="mt-2 text-xs text-zinc-400">{leaf.note}</div>
                )}
        </div>
    );
}

export function SkillTreeCard({ tree }: { tree: SkillTree }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-zinc-800/60 bg-zinc-900 p-6"
        >
            <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{tree.title}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500"/>85–100</div>
                    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400"/>70–84</div>
                    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-400"/>55–69</div>
                    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-orange-400"/>35–54</div>
                    <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-rose-500"/>0–34</div>
                </div>
            </div>
            {tree.description && (
                <p className="mt-1 text-sm text-zinc-400">{tree.description}</p>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {tree.leaves.map((leaf) => (
                    <SkillBadge key={leaf.name} leaf={leaf} />
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillTrees({ trees }: { trees: SkillTree[] }) {
    return (
        <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900 p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-semibold">Dynamic Skill Trees</h2>
                <div className="text-sm text-zinc-400">Current mastery + future leaves</div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {trees.map((tree) => (
                    <SkillTreeCard key={tree.title} tree={tree} />
                ))}
            </div>
        </section>
    );
}